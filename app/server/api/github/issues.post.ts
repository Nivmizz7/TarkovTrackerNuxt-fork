import { createError, readBody } from 'h3';
type IssueType = 'bug' | 'feature' | 'feedback';
type IssueSeverity = 'low' | 'medium' | 'high';
interface CreateIssueRequest {
  title: string;
  description: string;
  steps?: string;
  environment?: string;
  contact?: string;
  issueType?: IssueType;
  severity?: IssueSeverity;
  pageUrl?: string;
}
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
const sanitize = (value?: string) => (typeof value === 'string' ? value.trim() : '');
const formatSection = (header: string, content?: string) => {
  const normalized = sanitize(content);
  return [`### ${header}`, normalized.length ? normalized : '_Not provided_', ''].join('\n');
};
export default defineEventHandler(async (event) => {
  const body = (await readBody<CreateIssueRequest | null>(event)) ?? null;
  if (!body || !isNonEmptyString(body.title) || !isNonEmptyString(body.description)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and description are required.',
    });
  }
  const runtimeConfig = useRuntimeConfig();
  const botToken = runtimeConfig.github?.botToken;
  const repoOwner = runtimeConfig.github?.repoOwner;
  const repoName = runtimeConfig.github?.repoName;
  if (!botToken || !repoOwner || !repoName) {
    console.error('[IssueAPI] Missing GitHub configuration.');
    throw createError({
      statusCode: 500,
      statusMessage: 'GitHub integration is not configured.',
    });
  }
  const issueType: IssueType = ['bug', 'feature', 'feedback'].includes(body.issueType ?? '')
    ? (body.issueType as IssueType)
    : 'bug';
  const severity: IssueSeverity = ['low', 'medium', 'high'].includes(body.severity ?? '')
    ? (body.severity as IssueSeverity)
    : 'medium';
  const sections = [
    formatSection('Summary', body.description),
    formatSection('Steps to Reproduce', body.steps),
    formatSection('Environment', body.environment),
    formatSection('Page URL', body.pageUrl),
    formatSection('Contact', body.contact),
    `**Issue Type:** ${issueType}`,
    `**Severity:** ${severity}`,
  ];
  const payload = {
    title: sanitize(body.title).slice(0, 256),
    body: sections.join('\n').trim(),
  };
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${botToken}`,
        'User-Agent': 'tarkovtrackerbot',
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const errorPayload = await response.text().catch(() => 'Unable to read error body.');
    console.error('[IssueAPI] GitHub issue creation failed', {
      status: response.status,
      payload: errorPayload,
    });
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to create issue on GitHub.',
    });
  }
  const issue = await response.json();
  return {
    number: issue.number,
    url: issue.html_url,
    success: true,
  };
});
