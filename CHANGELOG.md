# 1.0.0 (2026-02-24)


### Bug Fixes

* accept SB service key alias in runtime config ([a49f947](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a49f9472056a4c84d0a46d81f90d9b286ba47dba))
* add context menu focus styles ([2d44011](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2d44011f50ab9474cef7d60b797eca690d061992))
* add cycle detection to critical path walker and fix relative import ([db4c6e4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/db4c6e4b594f40fc95a4b37b22ec424a94d8dbb2))
* **i18n:** add explicit useI18n imports and clipboard_copied locale keys ([3be3ee2](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3be3ee2ed5baaff390e00cf085c8aa83deff2569))
* add flex and min-height classes to trader card for improved layout ([90e2064](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/90e2064e2df95c7f7366ced0af451a7fcb754cad))
* **store:** add markTaskAsUncompleted and clear stale failed flags during repair ([754c07e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/754c07ec0812c1af48ec37db174dc641572eb581))
* **i18n:** add missing map spawn locale keys ([10b840d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/10b840dd9ae76ce87ca8bd8f9359725aea3b990a))
* **test:** add missing mock properties for useSupabaseSync return type ([39d6432](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/39d6432112382221a28559277b2112777bf6ec66))
* **i18n:** add missing profile_sharing locale keys ([b1f69c9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b1f69c932b22761daf20be83f8a6060dfc66bc49))
* **tasks:** add missing task objective types module ([1174b8f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1174b8fe2ee2e36f269c0d61d5b0e0ad87b1e277))
* **nuxt.config:** add NUXT_SUPABASE_URL and NUXT_SUPABASE_ANON_KEY for improved configuration ([28854d3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/28854d336a0ef35c47c0b1d3fceb810e6767ecd9))
* add optional chaining for icon prop and update icon type to optional ([436dbd8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/436dbd85f8571795c5ef18321d0b26917e54a9bb))
* **api:** add request timeout to cache-meta and fix import alias ([93e88b7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/93e88b7fdd07a4746dabdebaa9750078bb53f449))
* add required github headers for contributors api ([f2a35cd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f2a35cd11a0e32b64f75caefb4489fcafbd95dca))
* **api:** add retry logic and better error handling for tarkov.dev API ([47bc482](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/47bc48285bfa6d141fa098b5c9db059fd2ce2349))
* **ui:** add Tailwind utilities, fix styling, and use locale keys for ([52c283e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/52c283eef6ceb2b975676d8d0445802a96673c50))
* **settings:** add usage hint to Skills Management card ([b640106](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b640106585ec491ee3510404fb2eef3da6877990)), closes [#28](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/28)
* add VITE_ env var fallbacks to server runtime config ([2350a31](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2350a31a52e74cf47881c2b5ec72aa424a16d7cc))
* address map summary PR review blockers ([f5715aa](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f5715aa32b4faf02d99638f4afb4cb73e7e524cd))
* address memory cache type safety and leak concerns ([2887bf4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2887bf461816df75b8a73dff378a0e0dd613ae5b))
* **tasks:** address PR review — revert objective.item, truncate instead of drop, rename constant ([f9fe775](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f9fe775c9060b440518d77c338ca8491fc061e43))
* address remaining PR review issues ([1328aea](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1328aeacbc4b7de30718e0f9f89aca8599b837ab))
* **security:** address security lints and tighten privileges in database views and functions ([d439f12](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d439f128eea15c7804496f90c040268377800e55))
* **tasks:** align global edge cases, map totals, and ordering ([c1ae8f5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c1ae8f539b5c258efadcc4fcfddd3ee6881f67db))
* **tasks:** align Lightkeeper filter counts with task list logic ([#192](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/192)) ([bf7e4bc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bf7e4bc93e83a45e3082213e602d2588a72f9839))
* **profile:** align stats logic and add targeted tests ([d846906](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d846906cfa06cf27c38a196b7df8dc7e4ff409fa))
* align toast/task fallbacks and map pan speed row typing ([8022765](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8022765688f5cdf60f6bbe45ad22bba1eba5c44e))
* **tasks:** allow expanding completed quest objectives when collapse pref is on ([bb4819a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bb4819ac3ad54e49c8425f5a05a7c1b5d47f6a2e)), closes [#181](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/181)
* allow showing completed objectives on map when filtering by completed/all tasks ([8a49859](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8a49859eccff584c6b3e5af3edcd7e59899f8094))
* always restore original mode after tarkov.dev import failure ([#218](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/218)) ([597b5d4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/597b5d4db6344032e7a9a4a808e137b977e1de78))
* **tasks:** always surface invalid-task status context ([6320d6a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6320d6a0688e4b8f29167033bde4fd1c34370814))
* **ui:** apply CodeRabbit accessibility and style updates ([9275642](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/92756421feba75edc2f300fa60e4ad187aae0047))
* **app:** apply pending auth profile team and test updates ([ececed1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ececed16d006c73d890b9d42b427e565fcad5c1c))
* **tasks:** apply search filter to map markers ([2dd31c1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2dd31c116b18f7b9c9e0a5f683113d812907ec80))
* **needed-items:** apply shared prestige task filtering ([bec94c4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bec94c49be332f7924ca2c24c83665f74bd808e6))
* apply task overlay to objectives and rewards ([eeafa00](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/eeafa00a29aabc18a1272dbc31494d8bcdf593d4))
* **tasks:** avoid collector grouping spam while preserving quest-item splits ([#198](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/198)) ([4968d5e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4968d5ee3b1b6c19bad848f0041e72df17d95890))
* **streamer:** avoid false private overlay on protected internal fetch ([1a92109](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1a92109da3eaa35e94950f39f64bffb5ab38ea1f))
* avoid resuming stale sync controller ([cf81ace](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cf81ace47bf449b56308ba76f2ebdae2a74b7dda))
* **tasks:** block complete action on failed tasks and derive branch failures ([a6f9e23](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a6f9e23307a4d03b74c30620091349678e97abd9))
* **contributors:** cache GitHub contributors server-side ([8226f62](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8226f62fcb3801a3a6fb942f7a4dd776493dfb3d))
* **tasks:** cap any/sell objective item rendering ([6aedda6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6aedda605be7e092f9285800f4f54e1c3300a43d))
* carry working changes onto feat/ui-improvements ([c765ad9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c765ad9efe17b3e2e53e0d8d42328dfc81c0edfb))
* **tasks:** catch map objective jump errors ([6415b2f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6415b2f59d33000aa0e116a6759657366d3cf869))
* change action buttons from soft to outline variant ([a00050f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a00050f5e2a1d3b74407e200a537ee906290044c))
* **store:** change lastApiUpdateIds to a constant for better immutability ([d6b3123](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d6b3123c5735b3863fafafaec52bd65cbc16d369))
* **app:** clarify sync/local toast causes and add integration coverage ([#199](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/199)) ([8bba503](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8bba503042a37869334c00c1bc1fda1436e6d87d))
* **settings:** clean up account card and improve test reliability ([decab03](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/decab03234f48e66a0da21fc5d1ea8ee52b04752))
* **app:** clean up shell components and fix test imports ([d8a80a4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d8a80a456c3da35980c6946bde22b8106457ec87)), closes [#tests](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/tests)
* clear search filter when navigating to task via dependency link ([d7f29b3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d7f29b3c741bbda044be07b7bce8d84ea3f849e6)), closes [#65](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/65)
* clear stale local state after account deletion ([80e96f3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/80e96f35cb37eca011402eae4e38a3d97890fc37))
* **a11y:** complete keyboard focus coverage for issue [#103](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/103) ([cfd52e9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cfd52e9fc73726bef6d7c9dbbbea829ae9b4214d))
* comprehensive data loss prevention and sync reliability improvements ([7dee8be](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7dee8be960db1190453390c7340844be29cae9fd)), closes [#71](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/71)
* correct debounce import path in useSupabaseSync ([546b0a9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/546b0a9bfe753cc4ee2f59b47a4488b8217f5b37))
* correct doubled item counts for find+handover task objectives ([f64c2f7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f64c2f7b93ec4806582424c1d27a0d571876883f))
* **skills:** correct in-game Endurance sort order ([9db4c01](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9db4c018307970fb99d0c50803bd7006ce050ee2))
* **tasks:** correct map objective ownership and harden issue [#126](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/126) regressions ([fa7d636](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/fa7d636a111c218087507529f8540575c654093f))
* correct min-width value in NeededItemsFilterBar component ([3adf9ed](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3adf9ede57ac0e75ecca6d5f2581e329612348f9))
* correct trader level retrieval in isTraderReqMet function ([94973f4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/94973f41706a6a39d3cb2dfccaaea60cb4edf672))
* **app:** differentiate objective defaults and harden user_system admin writes ([60229ef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/60229efab526ccb7446a39197ea8057cbbd91ca8)), closes [#98](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/98)
* disable trader gating until trader data is ready ([dbd35c7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/dbd35c791ceb01847dbac65759f9b2faf38a6f50))
* **tasks:** distinguish fail vs uncomplete when reverting alternative tasks ([f0525aa](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f0525aa960e9a090fda73961a5b46f231aa414ec))
* **i18n:** Duplicate page.api key at lines 280 and 455 causes translation loss. ([5ca2e8c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5ca2e8c9add4b8c6018258b64aee8afa431bed04))
* **changelog:** enforce descending date order ([45ceadc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/45ceadc7f4b1c0e92c6422ab30f634d4baab7168))
* **oauth:** enhance logging for authorization approval and error handling ([b6e0214](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b6e021464c6a8edc937569a1be29752c73a0a1cc))
* **oauth:** enhance logging for OAuth consent process ([45bed30](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/45bed309a2d62ae317e997097ff69ad3635f678b))
* **oauth:** enhance redirect handling in callback and login flows ([9713be2](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9713be2358eeeb16eaea85023dc3069b2a6b6c47))
* **useInfiniteScroll:** enhance scroll handling and prevent rapid checks during scrolling ([171ae3f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/171ae3fdddf42e9b9c325956b97cc3880b552614))
* enhance sync error messages with table context ([be2fa27](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/be2fa278974577149fcccd9003553c2dc609e112))
* **tests:** enhance Vitest configuration for improved isolation and mock restoration ([2d7f7f7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2d7f7f72692647a4713d31d81c43c02255a50085))
* ensure consistent level display across all UI components ([f91763a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f91763a079da58b129706a2f3ddc27e4fe3b6452)), closes [#64](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/64)
* **tests:** ensure NEW_BEGINNING_TASK_IDS is treated as a constant array ([35e459d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/35e459d05127e21b36470fdf8fdea1a2f3aad526))
* **i18n:** escape apostrophes in fr locale ([c789172](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c7891726edf5e944f1488669e07cbe35804fea21))
* **profile:** exclude invalid/unreachable tasks from progression totals ([1dedc40](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1dedc40998ad18f6ba948ccc5c57684fbd5a5b4f))
* expose overlay metadata and purge task caches ([4272540](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4272540f022921a8bd3db764593fa464600132fd))
* **neededitems:** filter task objectives by user faction ([547500f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/547500fe25eb233838c1c5218b3b0397c8fdb88b))
* **i18n:** fix French locale issues ([17db1fc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/17db1fca0e961d9337512bf653f2b520c0f7f9e0))
* **lighthouse:** format assertions for clarity and consistency ([2d113d4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2d113d427efc1ed9d99ccd85dec6b86e9ed38cb4))
* **locales:** format notAvailableDescription strings for consistency ([ee5ccbe](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ee5ccbe7157ee9e778e5b1e2bfb5052d3fe2c598))
* **streamer:** forward host header on internal $fetch to pass API protection ([a52e3c5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a52e3c5209e5b814ec751c41a4fafac9c53708e5))
* **api:** forward streamer internal fetch headers in production ([d2c8fc9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d2c8fc9e097d7615c0a5e31cf21aa6055ed3e8bb))
* gate nuxt dev-only modules outside production ([3b36d53](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3b36d538d9c12114ad0896faab86184db2f5366f))
* guard initial sync to avoid data loss ([05807e0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/05807e0fb019acad0d7c17dfee1b7b95645975e2))
* guard overlay deep merge and apply hideout corrections ([52052e3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/52052e38a4835f2cca0b95b926d6f265b6352af0))
* handle filter changes more robustly by resetting store and managing initial load state ([b8884bc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b8884bc820ecce68488e7dfc785e1adbbc38621a))
* **app:** handle game mode rollback failure and validate changelog dates ([3c703ef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3c703ef55ee4d358b3f06dbefd9128065a318200))
* **tasks:** handle merged map ids in objective visibility ([#197](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/197)) ([e48af6e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e48af6e0cb1578bb2430be37f3f1d96680e3b459))
* handle null rewardItems entries from tarkov.dev API ([3a0c29c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3a0c29c5c46bafae6200bb591c92669bfc2274f4))
* handle undefined values in GPS coordinates check for map objectives ([678058f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/678058f6b8faad2631b1740c160dea9294b61c22))
* harden account deletion and sync flows ([b3881ff](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b3881ff7db16d5cbf159716587713d33f0306cb1))
* harden cache and server utilities ([77b10ef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/77b10efe18722207f4efa5be74a5065ace62d306))
* harden failed task handling and manual fail flows ([a576d90](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a576d90c48b379ddb1346731c6235a9b96dbeb83))
* **tasks:** harden prestige New Beginning task mapping ([b7905a5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b7905a5c846b07df47b913a2c38af1207bf06ce3))
* **ui:** harden select menu property lookup and add drawer aria labels ([efda7a1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/efda7a1b0f486fb5ffc799d79b27bf7a0329830c))
* **api:** harden shared profile and team endpoint caching ([b1354d7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b1354d73ab03baafd085c0ba2c35798a0616e8b3))
* **app:** harden supabase sync and oauth login flows ([302a295](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/302a29557a26cd32157bd83a65965b116d779479))
* harden sync and team updates ([2486616](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2486616936012aaedff736ef0252c8b59b845871))
* **security:** harden XSS prevention, accessibility, and OAuth lifecycle ([d7c7db4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d7c7db48a0fc5dc07c03ca293c06c27c7e8e1677))
* hide completed objectives from map display ([a8d3762](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a8d3762c1b02c3c1937f598d771938d28e416761))
* **app:** hide dashboard filter notice when progress is collapsed ([6735b48](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6735b48cda8871c52caa8c2bc7085ba4bb587ccb))
* honor failed prereqs in invalidation ([3787dc6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3787dc65176066dc038446f34bd032b90cf5cb7d))
* **ui:** improve accessibility, security, and component consistency ([b826544](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b8265442b9d941f655abe1ad863841e3145fe82e))
* **lint-colors:** improve baseline handling and reordering of imports ([8f23071](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8f230711da305eda7fc0d6396973facd796494e5))
* **ui:** improve ContextMenuItem keyboard handling and update icons ([d775de6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d775de6d5397e18c61912c0be1713eae2c4c501d))
* **app:** improve error categorization in sync-maps script ([c681a1c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c681a1c1eb7a3b02ea6bb8f5f5876c0515d45396))
* improve error handling and type safety in cache APIs ([f40ee28](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f40ee28f60d91c267b3cf48f5077eb71d7b9d925))
* improve error handling for debounced functions ([309aa01](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/309aa01d4feef2872b76fb194c5858fbc6130432))
* **oauth:** improve error handling for expired or processed authorization requests ([9e54221](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9e54221e0bc8b6ebebea5925ca7985206a15bc27))
* **app:** improve error handling, logging safety, and remove unused import ([68db07e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/68db07e40c75d1e74e8d0222cdf32426026b225f))
* **scripts:** improve floor ordering in sync-maps ([ffe775c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ffe775c12f5e25f3a92275bc44c6da83efe8f31f))
* **neededitems:** improve infinite scroll reliability for fast scrolling ([4f34c2f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4f34c2fcd9828ff492bcaf83bcbfb54d5ea03883))
* **changelog:** improve load more UX, stats coverage, and server caching ([753899e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/753899ea689dd1db8c8e03176da1f38c78567e15))
* **oauth:** improve logging format for authorization details retrieval ([527fb94](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/527fb94b69ae8cd65d6fd2283be18b4fa81a1845))
* **tasks:** improve null safety and normalize locale keys ([a7bafae](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a7bafaeba4cd210e16418b69fdebeb750fc0058d))
* improve popup management in LeafletMap and clean up TaskObjectiveItemGroup comments ([ceef09c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ceef09cfb11b8ebc95abae0a9afe7ac97d38377b))
* **config:** improve redirect and robots.txt configuration ([5739643](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/573964378fa60433c9dd1469c3439d23c08f1bf1))
* improve task completion merge and objective type inference ([8a5898b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8a5898bc95874b18edf98e625096cd896e176da0))
* improve TaskCard completed state visibility ([0b6b593](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0b6b5930e2e6bffb251fe473976aaad79ad2104e))
* improve team feature robustness and add RLS migration ([efe899b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/efe899b3314405b52224eee486a96e393e90dd73))
* improve test infrastructure ([b0c68f9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b0c68f9d32b3cec8d15ca8234bf85450d22d3d88))
* **maps:** improve tile layer cleanup and tooltip translations ([479be7d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/479be7dfec554814195538d377eeb096f6994e8f))
* **supabase:** improve types and migration idempotency ([19c69b8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/19c69b833fda2ed74e8507dab0837031f1c6cbb2))
* include Lightkeeper trader tasks in filters ([03504fc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/03504fc14e0960c796eeb3b3ed0a92205ae8f3f5))
* **tasks:** include objective.item in equipment aggregation ([9dd8bf8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9dd8bf8af59578fc28490fa87604e8daef829962))
* **tasks:** isolate map stacking context from overlay drawer ([ea9b01a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ea9b01a69ed4a1635a44cb8636e62022689d0e72))
* **i18n:** keep external tool names in English for zh locale ([440f332](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/440f3326814b69a195de124b9b904ad3ea16bf53))
* **ui:** keep release note order in dashboard changelog ([abfbbba](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/abfbbbaffe7bcf85f04982e5235ec604f2e15884))
* **maps:** link objective tooltip title to wiki ([77caa39](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/77caa391680cd0b02ac24e2891f68bca8879ba0c))
* localize EFT logs import messaging ([1a53030](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1a5303062b90066f91037b9b5ba237367ff981f1))
* **i18n:** localize task requirement and block/fail strings ([c1dfa08](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c1dfa0878ad0c6e44d14594bb29615fd6f0c8272))
* **store:** log stale failed-flag cleanup context ([d169c94](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d169c9457c2e67cc9ff1ca69984953de740aeb15))
* **tasks:** make Impact optionally respect active filters ([368a202](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/368a2026b2ca75923df0db42bf3bd286215f4337)), closes [#92](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/92)
* **useTaskNotification:** make objectiveAction optional in handleAlternatives function ([1973024](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1973024f233d66e9d28682b8904739664f3306f5))
* make task settings modal scrollable ([5cb66f2](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5cb66f277b7a5fcb957187476c871b7fa17c3367))
* **oauth:** make user and scope properties optional in authorization details ([4d8df72](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4d8df7213e4b4e03776fd365610e32c8efacf363))
* **import:** map memberCategory 1024 to unheard only ([e182b46](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e182b46b0eb6b653ddb066415dd33967ef4ad3ab))
* merge overlay patches for id arrays ([23c7a95](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/23c7a9540005e85d5de5ccfbead4d54b5081e4ef))
* normalize task objectives ([cd1bcb6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cd1bcb6e6da83b88f49b18553bb1b81d2d65dc99))
* Normalize team gateway paths for robustness and align team creation/join parameters to `join_code`. ([eefb43c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/eefb43cd478b27dd4481bcc879a397932e703c98))
* optimize ResizeObserver with debounce and error handling ([5be389f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5be389fa31b406242ae62d44e22f3a725d1c5847))
* **tasks:** override Duck Hunt duck pate objective icon ([32cc47f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/32cc47f1386405a7250c662e4d3cbe8e796d5126))
* **deps:** patch @modelcontextprotocol/sdk cross-client data leak in MCP plugins ([9ff9a55](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9ff9a556b5437a762395398fdb25c2f0d886f85c))
* **deps:** patch axios DoS vulnerability (GHSA-43fc-jf86-j433) ([8cae402](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8cae4028d948d3c0556cbdb019cdc65b4b909779))
* prepare nuxt eslint config in lint scripts ([2edab7f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2edab7f7e8ba805c7c24e8702ed30658a8f166ba))
* **tasks:** preserve manual failure state during repair ([d6930e0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d6930e0c2e60f1cedc9d4d31b5a53c86b09e3f2e))
* **tasks:** preserve status backgrounds for global accent, fix es.json5 consistency ([cd1db2a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cd1db2a91fce6a42e531db998c432966950c0828))
* **tasks:** preserve status borders for global accent ([83621a1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/83621a1610a7042617797e5d5680e067d14a57e0))
* preserve storyline progress in user_progress sanitizer ([#193](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/193)) ([1dee50c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1dee50c0cfc205000bcda73c88e5de514deda220))
* **tasks:** prevent early returns from skipping sort/sortDir sync ([75631bb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/75631bbf4f4632d8be5993c36dc9b7e8146886ca))
* **tasks:** prevent hidden teammate mutations under hide-all ([1526d83](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1526d83bdfdad2b0d6b1e32def064ed9ee6a2ac9))
* **useInfiniteScroll:** prevent multiple queued nextTick/rAF chains during rapid scroll ([6cd135c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6cd135ce73d25b92354f7d4d86d5756901e3e041))
* prevent nav drawer content from shrinking on short viewports ([465a735](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/465a7355a5cd21e7f96c50635ca5bb28a99bc4e9))
* prevent race condition in debounce function by capturing local resolve/reject handlers ([241cf82](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/241cf82f35495ff33ae72e1a52f4490e95cc0442))
* prevent task objective markers from rendering behind the map svg ([d7c7abe](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d7c7abee2ed10315d0d5f29aa5d7c5ed060dce37))
* purge legacy user storage key ([31d3428](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/31d3428c7dc01a17e30f251743b9210f79e3f8c8))
* **tasks:** re-expand map panel on objective jump ([698c6b1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/698c6b129096991a7e948d2dee09d0fa367cde1a))
* **tasks:** reactively update map when global tasks filter is toggled ([c9275d1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c9275d17032807f866efc75f486e793bbaa8ed8e))
* **hideout:** read calculated skill levels for requirement validation ([393d6b4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/393d6b40fcd26413f2c8d440fd767094941ec195))
* reduce AppBar height from h-16 to h-11 ([c337243](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c337243b44ed95bbe4b52a385689d71818cfa350))
* **test:** reduce test duplication and improve descriptions ([c6e8853](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c6e8853b4aa10d6608fe6e190576d713b256fe08))
* **test:** refactor createMockUseNeededItems grouped items logic ([bf545ec](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bf545ecfe7c66604fc7080ae9403c6793ad4094f))
* **oauth:** refactor Supabase client usage for improved session handling ([2b7c661](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2b7c661620f982144c58299952a1e4cb8f47c137))
* refine task list filtering and scroll behavior ([007484a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/007484a55eb0caa14721abf2d39f47e4fa19481e))
* **tasks:** refresh visible list immediately after task actions ([9e7ec9b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9e7ec9b0cc12b0a183f6416484df26fc2888d411))
* remove delay between "jump to map" and map element being selected ([01e228a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/01e228a888a4304534365e2fc8c336e862f3fc99))
* **nuxt:** remove prerendering for index page ([eb7f24c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/eb7f24cdc5e27d820d777f4e6d905443f462aaaf))
* **oauth:** remove unused Supabase client reference in consent.vue ([8eaa0f7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8eaa0f78603f11c0d0847fdff430a62509be0aa1))
* remove Windows-specific path from .gitignore ([5dcd842](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5dcd842dd3149071dab0cf3993ca5a9df5815077))
* **config:** repair typecheck ([613ba02](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/613ba02c93df96db80ede5d42bcaf75ed78e77f1))
* **tasks:** replace async components with static imports in TaskInfo to fix tooltip ref error ([c9c4f0c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c9c4f0cc69d8cbfd8bba12e532b49d5b1d34c153))
* replace wrangler with serve for Lighthouse CI preview server ([4822a4f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4822a4fc4d6f9304f072e34f464454350b5b73d7))
* reset legacy storage keys and drop dev host ([9018d72](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9018d72ae687501b635e4ce3e271e3e5caba666a))
* **app:** resolve changelog typecheck errors ([9749a3b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9749a3bc755fe6617afa05c6f4496be5dac89ba5))
* resolve CI failures in PR [#136](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/136) ([d77ad6f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d77ad6f72d79e65b9db4a4303d4f45cb07243336)), closes [#imports](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/imports)
* resolve ESLint errors across codebase ([e96db47](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e96db47f702699cf1aacd1cc9d985c80350e17bf))
* **app:** resolve hideout status, objective count, and preferences sync bugs ([d7ca5f9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d7ca5f9131eb2fbb087891ded45d44dd64ecdc4d))
* resolve Jump to Map functionality for task objectives ([361140c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/361140cea97e02a5b4f76ad46a0222ce0e972954))
* **app:** resolve preferences sync race condition and simplify metadata initialization ([c46ab11](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c46ab114b76b9d85055a078f317698f19267ab6d))
* **settings:** resolve privacy mode infinite loading and add cooldown ([6707070](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6707070eafa48ed618c82ed3ec6eaeaaebe1db90))
* resolve Ref unlock gating and migrate legacy task completions ([2e2312b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2e2312b08cd5c498e1be5ba253585982669a6fd4))
* Resolve RLS recursion and broaden select policy for team memberships, and improve settings page robustness. ([ce66cfa](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ce66cfad32a53f78460e4bd98d663dec8dfa11f2))
* resolve shouldLog redeclaration conflicts ([4857ccb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4857ccbc453c7ad06779ab3a3e1fc458ef17f5c5))
* resolve strict type errors in progress completion handling ([1d3d572](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1d3d5724f8ebb4a7135289ab0e8af576673615f3))
* **app:** resolve timing, state, and correctness bugs across features ([f06adf1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f06adf1a25c76dc6fe2d6dde98795ed9ede9bd1f))
* **app:** resolve TypeScript errors in api-protection and logger ([740fd39](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/740fd39a4ca7e46ba129049a5798b805cb132c9a))
* resolve z-index context issue where map overlaps nav drawer ([54414f7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/54414f736fe9720903a19031c77224a154c934b2))
* **tasks:** respect manual fail flag in repair and normalization ([f4dbd67](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f4dbd6733dea1b7f4691c5748bff2bbb6df01c59))
* **maps:** restore map tooltip links for wiki and tarkov.dev ([2078218](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/20782180084fcee0e536bc43b669dbf655895796))
* restore objective item icon fallback ([6c8ce8a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6c8ce8a12ce419771941bc94061a49112316526f))
* **tests:** restore originalFetch assignment in kappa.test.ts ([fea93c4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/fea93c4e6663daa424da922ca57f273488c7ec65))
* **app:** retry preference sync for multiple missing columns ([a4112c8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a4112c81eae9269b93862b7ce43416bd27e3da57))
* sanitize sensitive table errors in account deletion logs ([2a44dd9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2a44dd938377ee57f9a4566d3bc7e32fa2e82ef8))
* simplify manual level editing tooltip and button logic ([7523123](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/75231238dadbe4c4254351bb3e79c585dd12bc21))
* **auth:** stabilize OAuth loading lifecycle ([a21914b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a21914b620b9543bfd64325cca04ef202de6354c))
* **hideout:** stabilize route sync watcher and es copy ([16775ce](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/16775ce4af27e478a1ee6b98f36b07551808c414))
* **i18n:** standardize task terminology and add Found in Raid translations ([f72bcbe](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f72bcbead3478735b5b8d95766b7b35a197064ba)), closes [#109](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/109)
* **tarkov-store:** stop repeated local ignored toast on refresh ([d15d4ab](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d15d4ab8e17eed7fedb978ad19a734fe4a86ce88))
* streamline needed items visibility ([d87610a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d87610a645c786732d45a50d2f279d93433538ce))
* **oauth:** streamline Supabase client usage in consent.vue ([0918e5e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0918e5e508dd7637e89651d50846a79ece4b404d))
* **test:** strengthen assertions and reduce test fragility ([da27f8d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/da27f8d15b87c984dd339cbc64a7741aa668db90))
* **settings:** support decimal skill input precision ([#160](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/160)) ([ce1e9dc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ce1e9dc0f65f47d977ae010bfa7a622e6b695b66)), closes [#159](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/159)
* suppress false progress merge toast for self-origin sync ([0ae7673](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0ae7673ad33a00ad9581f2f475bbdc8bfe00fd7d))
* sync api-gateway lockfile with package deps ([19df7bc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/19df7bc5b83cd7672b1bf1a77df1bd8e6d5d0342))
* **ci:** sync api-gateway lockfile with worker deps ([7e79112](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7e79112b23fbb60dd27322866df53483c6441899))
* sync derived level to database when automatic level calculation is enabled ([46b39fd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/46b39fd50cc8faced3060cdea7f001b1862ab806))
* **maps:** sync Interchange bounds with tarkov.dev ([866fce5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/866fce51058cc56ce505935ed679ab2555e345c0))
* Synchronize user team membership in `user_system` and client store when attempting to create or join a team. ([961877e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/961877ee5d5ec3a3374e8affc13d908c87e2b588))
* task badge count does not update according to task preferences. ([#132](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/132)) ([415b7fe](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/415b7feb81a3ed8e2955e440b6d1fb4ade0e0423))
* **tasks:** treat failed tasks as incomplete for impact scoring ([0378325](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/03783255f1290bd5ac452fdb6d05b5bf234e13e5))
* tune api-gateway rate limiting and CORS ([0d0a5bd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0d0a5bde9fffce67b55a6b281fa656fc3ae86d01))
* **deps:** update @unhead/vue and @cloudflare/workers-types to latest versions ([a03763c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a03763c8831639ac3ceecadad5fcd9354f4a2db4))
* update comments, formatting, and loading screen logic ([c599411](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c59941113f62818e37a0b4300554063da4e63116))
* update credits retry click handler and contributor fetch flow ([a3bbfbb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a3bbfbb1dc6f712f9922fffc33198b05c853dc58))
* **config:** update migrations and database types for preferences and security ([01c9f5d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/01c9f5dd6eadaf4a1ec1b86d4908b48a04faabae))
* **ui:** update nav drawer behavior ([eff3021](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/eff3021863903b0aa09307b2f37ac06b1b15dee4))
* **dependencies:** update package versions for @cloudflare/workers-types, @types/node, happy-dom, and supabase ([ef8a72a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ef8a72abbafbe2435530013e2962e5bb9700471d))
* update transform type to allow null return in SupabaseSyncConfig ([c5aa741](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c5aa741aee2f644c22e9f2c95721df573e069e28))
* **tasks:** use direct parents instead of transitive predecessors for locked count ([a0e7f1f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a0e7f1f0d64c45bb7b083e855ddd2f80cdad37a8))
* use function-based $patch for reset to fully replace nested state ([b75685e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b75685e872b64a8574e58f2c20c1d8f579b2307c))
* **version:** use release app version and remove tarkov version config ([bbfc8ea](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bbfc8eacd488e45c6c257a13f451cb02a2df9c86))
* use ResizeObserver to handle container resizing and fix centering during init ([83430fc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/83430fcda83c87aacfb48d5ee732d84a72bc3844))
* use setLocale API for locale switching and add test coverage ([7ec11ad](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7ec11ad9aaca0cada04d34d605739b7e78b34471))
* use solid (default) variant for action buttons ([b0fc15d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b0fc15d56a492f180560f4322d9c0281e7ddcf39))
* use useRuntimeConfig for Supabase credentials in team/members API route ([e12ada0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e12ada05564e2d3dc1aafd26bc27bf83d80c9942))
* **team-gateway:** validate UUID inputs and stop leaking DB errors to clients ([0737407](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0737407276211cdf6c7a8ac311685101e460b6f7))
* **test:** verify prototype pollution throws with descriptive message ([d2a1fcd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d2a1fcd747bb289e03bb949f9cadff6779b47080))


### Features

* **maps:** add adjustable zone overlay opacity setting ([0ad3346](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0ad3346a954a6e4a26fb7812db3f25b375390436))
* add admin panel with cache management and audit logging ([66c6580](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/66c6580ba87e0eef2dcb0eaefed054cea09dc2ab))
* add api gateway and game-mode token prefixes ([c820b0d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c820b0de88da6640b815589538d2c5f82ba80c37))
* add api subdomain routes ([c4067ca](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c4067caea364952c5ef9317f257e14e7d12032c4))
* add BaseProgressBar component and user preferences migration ([ccbbab8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ccbbab85b3e0b22a8adf9db0ade86dc9f45b93da))
* **app:** add birthday dashboard banner and contributor credits ([f16454c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f16454c23ba31580d8c2ac4c3936420c0c8b7d82))
* **app:** add changelog feature and dismissable dashboard notice ([945be35](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/945be3575a0fe4408a4899304d94bc2824f8eefd))
* **i18n:** add Chinese translations and translation script ([37ea0a0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/37ea0a095731bb539d8b1cdc1400494ec6217297))
* **ci:** add CI/CD automation, git hooks, and dev tooling ([#142](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/142)) ([692f478](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/692f47899eaaf9f2bbb6a2960e35faf96138e7c7))
* add Claude plugin with Tarkov MCP servers ([92862b4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/92862b4d0a30bb059a4b3a2e28dc461ad84be6ad))
* **traders:** add click-to-filter navigation and fix display issues ([b6df037](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b6df037447d4153c971e6507392926cd97778014))
* **app:** add client and server error monitoring pipeline ([9dd8f6c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9dd8f6c5b352e5942d8d44546eccd9f8298d0683))
* add Cloudflare Worker for team API gateway ([7a9befe](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7a9befee6a154ae0a7a8137f677a245d1ac30cac))
* **tasks:** add collapsible map panel and map time badges ([294aae3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/294aae3ee471a315bf7da5e6cb6585a9ffe1248d))
* **tests:** add comprehensive unit tests for various components and utilities ([a57b0a9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a57b0a9906c8cb1075520dd62cb4e726a0784454))
* **hideout:** add configurable prerequisite filters ([17a6434](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/17a6434e5610ebb7733a46562395c4acc2e428b8))
* **tasks:** add context menu to task dependency links and improve deep linking ([da1775b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/da1775baf92bc7f3991d5dd7cf9a69f24b3fb343))
* **neededitems:** add context menu with wiki and tarkov.dev links ([32b7887](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/32b78876da27d7ecf497044baafa80da441f72eb))
* add Deno stubs and configuration for Supabase functions ([d1075c9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d1075c9f76aa0f8d0779b75f0df346bb7b425ed6))
* add EFT logs import support ([59ec0ca](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/59ec0caf573e36d8ec3417c6e7850ef32ede810e))
* add error logging to error page component ([fcfc305](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/fcfc305d5323eb6289c54657b33e54a28b72b6ea))
* add experimental payload extraction configuration to nuxt.config.ts ([aa14412](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/aa1441294fb65aa566a7db9b0a9426e1f995892a))
* **team:** add exponential backoff retry for teammate stores ([23741d1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/23741d1911497d757ef478ab3aaf6081b6b012fb))
* **api-docs:** add favicon link to API documentation ([8baa219](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8baa2193fd3bff1e74cc61e81c60c4da96c76ba9))
* **neededitems:** add filter type and sort validators ([6fbba36](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6fbba368002a6946f1210dd2a89f84e3b66fc5ba))
* add formatting and linting guideline to repository instructions ([5773cb5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5773cb5d6179a4f0d88beff6be8b2d4125863ffd))
* add game mode separation for teams (PvP/PvE) ([b17a312](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b17a31223691810b39d853582189c9ca93a49f91))
* add gateway fallback support to team API composable ([5054822](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/50548225b421d25ac1f3e6399134a4351e6f6716))
* add generic useRouteFilters composable ([582a636](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/582a63674f5b5f17d919464b47c2c6cb3e58b8dc))
* **changelog:** add GitHub API rate-limit tracking and localStorage caching ([003ce84](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/003ce848bd80fb205c60385b85d98b526bf47d65))
* add GitHub as an OAuth provider and update related components ([2dd8c0c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2dd8c0c31e533e410c89e2820c4a665679abfc89))
* **tasks:** add global accent variant to task cards ([de768bf](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/de768bfbce2e27f47c8b7dcd2ab66c872e4c59ab))
* add Google OAuth as login provider ([d4db455](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d4db455d5430f2af05137555e4fb66ece66060bb))
* add graphql configuration files to .gitignore ([f7c4e7f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f7c4e7f9c46ec44cdab8ed06ef111723d30f8925))
* **maps:** add grid-based PMC spawn clustering with zoom-dependent rendering ([7e5314d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7e5314d573fdfe666fc368b0a543d78f08ea069e)), closes [#84](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/84)
* add hideout items dashboard card, gateway resilience, and needed-items route sync ([7040fde](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7040fdefc15e89af65e6048b25d2c139efef7aad))
* **i18n:** add hideout prereq confirmation strings ([252a391](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/252a3913426d7d3c62429267db2beabd8bf71518))
* **app:** add hideout prereq preferences and preference migration ([930a034](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/930a03459d6b500e2a78efef198f5e4324539ba8))
* Add hideout station anchor links and refactor requirement count management. ([5c183da](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5c183dae56fd525225a72baf4548b6bc61873be7))
* add holiday effects with toggle ([50cf8ec](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/50cf8ec32dd46438068a359eb23a26007044dbab))
* add interactive Leaflet map system with floor switching ([f932094](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f932094c77fa49d2e198debde3bb94685063314d))
* **neededitems:** add item grouping, FIR filtering, and improved card layouts ([dd25d15](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/dd25d153f74e54f50f213281c3e7954e1040cadc))
* **api:** add items-lite endpoint and refactor data fetching ([0f84d5a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0f84d5ab7ea416cb1e669f675aa8a34398244973))
* **maps:** add map color and pan-speed preferences ([47e2dd6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/47e2dd65a0ea79f25be67d57388aea0c6acf7d84))
* add missing user_preferences columns for client sync ([f3cd683](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f3cd68311db4ba9b9378be50504a581fdd8f9948))
* **app:** add module completion and currency exclusion to dashboard hideout stats ([f9795be](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f9795becdc8bdeb6e7796c2745e6da09d007dbd7))
* **app:** add offline mode support and UI improvements ([399f23b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/399f23b99c58ab487dbf89a17aa1f93fa0aacaee))
* **api-gateway:** add OpenAPI documentation and update routing for API endpoints ([553e853](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/553e853a6479ae57eb280208dd6d2eceae28498d))
* add OpenAPI validation script and update OpenAPI spec ([30f7483](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/30f748351bc23b5efc2f4ccda50d79bad77d6f2e))
* add performance instrumentation for debugging and profiling ([03e045d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/03e045dfe841db1fcfbf66cf63696580dae7a29d))
* add profile sharing, streamer overlay enhancements, and security hardening ([0cf45b7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0cf45b79ffe9b060739ca7ea67d4ed7f38ce8106))
* **tasks:** add QuestObjectivesSkeleton loading placeholder component ([33f1b37](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/33f1b3743280a291b53689d1b979ee7c577f6004))
* add real-time task sync for team members ([31c689c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/31c689c971b2186d653608fa3cd0dcd11fdbee80))
* add SEO improvements, loading screen, and automatic level calculation ([1204502](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1204502e75ea272fd05dc1ace036efd5ad2dd7b8))
* **cache:** add server-side cache purge synchronization ([d90cf41](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d90cf41741a0168999b115f48199f434651b3eed))
* **drawer:** add settings link to navigation drawer ([e2534cb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e2534cb07bdbb300364b52b9550d01156bc95aed))
* **types:** add sort mode and direction validators ([56a25d3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/56a25d374a87988637dbbdb13e222ed5cdbd2e6a))
* **app:** add storyline chapter tracking and chapter card refactor ([ba84630](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ba8463082b71562d0da7f1e4688a01b75b8af5ee))
* add tarkov.dev profile import, profile tabs, and map TS hardening ([82e033e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/82e033edfb4ad4c99af9a3e8053714d710d1cd97))
* **ui:** add task pin tooltip and refine discord hover color ([e50827b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e50827b3bdd798da4d97e14196067fab307ee0e3))
* **tasks:** add task settings modal with filter and appearance options ([f89b62e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f89b62e8af321b620b85363de35bc95883241882))
* add task sorting controls ([00390b8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/00390b85dd3c331d1277374f30afbb4753ab643c))
* add team API response type definitions ([775112d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/775112dad2ebea43a9eec0298863ebe5e113edae))
* add team progress endpoint and do rate limiter ([bcbf1f3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bcbf1f375a9488a66b9610f2680979f5071ba0bc))
* **i18n:** add teammate retry toast and needed-items SEO locale keys ([e210f51](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e210f51a01d2491096717eddecdf2d048315d1c4))
* **maps:** add tile fallback URLs with automatic error recovery ([e5688c4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e5688c465bfda9969e6bff42fb17a60e21050901))
* add tooltip to TaskFilterBar settings button and update test stubs ([f66471a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f66471a7e76eae92f514d19c900465988b45fe79))
* **tasks:** add tooltips for minimum player level and quest requirements ([aded696](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/aded696efd68f3890d1b05b81e8c162679b272b8))
* Add trader display order and enhance task objective handling ([00c2b57](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/00c2b5716d45eec481c8294063d4628070747a22))
* **tasks:** add trader quest dependency graph view ([678edf7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/678edf76e2aa2e67fc9d20eb7c3d6cfb4a7c96b8))
* Add Traders page, enhance needed item tracking logic, and implement UI/UX improvements with new components and image optimizations. ([72fa574](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/72fa5749e72a99b83b97bf41dc3425f7d23acae5))
* add type guard for ID-keyed arrays and improve ID handling in merge functions ([e970161](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e9701616a0912464603e232e2f8fad3d7401d331))
* Add UI and logic for managing team display names, including new localization strings. ([4151579](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4151579b79afc36aac95b9769cae887b4f5e66ff))
* **hideout:** add useHideoutRouteSync for URL filter state ([83a19f0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/83a19f026852b2365f0febe0e208b801d5cb1af2))
* add user preferences for task filters and UI improvements ([b95a82d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b95a82d6a8b274af6613b160aaf64bcfd519ae91))
* add utilities, types, and color linting scripts ([3c44966](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3c44966be2d0ef47c703a59a04a0317d2621c8fc))
* add XP/skill calculation, prestige system, and major UI improvements ([4fdded1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4fdded1f0d5364fc5241d58ec6db70a0f59adb67))
* **maps:** add zoom speed control ([06b90e4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/06b90e46069b577a2d1a92f8466e358ac1f9e7f8))
* **i18n:** added Chinese translations with English locale ([484b29a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/484b29a6dc559198b9df9b29eab45ab624fc22d1))
* **tasks:** Added task keys full name and hover copy name button ([#131](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/131)) ([1434d3f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1434d3f43f77e562e02f98a5ae749445c7e60df7))
* Adds a required equipment summary tracking per map ([7339809](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7339809a22bc3136653359f43794298428ebf1be))
* allow 'password' as an alias for 'join_code' in team creation and joining functions. ([9e7cd01](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/9e7cd01f1d8184013a3c4c4232f32ba967c42b99))
* **app:** allow collapsing tasks in map view ([381a59a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/381a59af2c0103dc399059efe68d2c5ba817236e))
* **app:** allow collapsing tasks in map view ([84ea78f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/84ea78f0433ec350c5c47da1c001c6eab67a352e))
* **needed-items:** centralize settings and separate handover state ([120da56](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/120da56eb10803f3c948affe0f8832acc222c9d1))
* **settings:** clarify EFT log import when logs are cleared ([1d935e8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1d935e81ccceea417e55b19f14baff14d2622258))
* compact skills settings and polish UI ([441fbc4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/441fbc415afac534b392b6bd2873482ef2c4aba6))
* **dashboard:** consolidate update notice and compact filter indicator ([b33fe4c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b33fe4c8d2ec2497c4aa57051e488d23b92cb202))
* **settings:** create TaskDisplayCard, MapSettingsCard, and PrivacyCard components ([b434012](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b43401224cbdfd3a80db15610638c9dc8b5af7a1))
* disable prestige in PVE mode and enhance overlay task injection ([cc00ca1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cc00ca15017b3c9a3a0d0007ef93d6126d864f06))
* disable smooth scroll for window-scrolled pages ([d5bc124](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d5bc124e1e8c02e7d654b42b4426a5e26b5bd620))
* **tasks:** dock settings drawer beside map on large screens ([06f9109](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/06f9109b260b888211b210e7402de62c6fcf4bda))
* enable API tokens feature and configure gateway ([637f1a8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/637f1a8d9f733b919647b1bbed906e8b128fb3b6))
* Enable real-time team data synchronization and add a new team creation UI update error message. ([939975d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/939975d0acdd9e5a4821ee7a9daed0c3285813f1))
* enable smart placement for api-gateway worker ([d445f7f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d445f7f918942040f301a4c7ea8c3765071c79db))
* **hideout:** enforce prereq cascades with confirmation ([c140f14](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c140f14a6b9f3b6643760758b69cad4aeeef50fc))
* **utils:** enhance async, objectPath, and mapCoordinates utilities ([0fb351a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0fb351a9dada58acbe58788d2b11d53f9c10b93c))
* **ui:** enhance dashboard cards ([8ad9caa](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8ad9caa2bd03672dbbfb5ce71f6badf83b2c85cf))
* enhance data migration functionality with improved state management and API token handling ([23d0c60](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/23d0c604ee9ea393674af8437011a60dc0d38fd7))
* Enhance hideout item requirements with Found in Raid status and attributes ([649e729](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/649e72909a996f75eaf14d1835e5099cda8bdc92))
* enhance localization and user preferences ([126217a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/126217a1a1cc84d1f423200cf7097803bdc92d40))
* **maps:** enhance map composables and add sync script ([4d0c8ef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4d0c8ef67a71d195c3297a530d25696f9e2b8a8a))
* enhance modal layout with improved scrolling and responsive design ([3e39bd1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3e39bd12e7b6dab601b2477184035e43c778e6b7))
* **ui:** enhance needed items filtering and display ([2beeaef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2beeaef715412ba0c6573313cdc6e62119b84fac))
* enhance needed items kappa filtering and indicators ([28565dd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/28565dde10b0ad1e10f59ba10dfd9fff557442dd))
* **ui:** enhance needed items view ([4b2d81e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/4b2d81ec7c6fe58002f23cbce9488441934ad901))
* enhance NeededItemsFilterBar with search focus handling and filter bar interactions ([2454d96](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2454d96d2ab585727a72786de07c158bd6af0a5a))
* enhance objective type inference in overlay utility ([e991314](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e991314a5ced9a51237ab85994ced0452f7adc80))
* **sync:** enhance Supabase sync with error handling and fallback logic ([483c2ed](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/483c2eddf385058ec48cc782ae6cb41dc49bb716))
* enhance task and tooltip interactions with pinned tasks ([84de201](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/84de201afda139ae946e16538173925dd4c7894e))
* **progress:** enhance task completion handling and update OpenAPI spec ([ea34ba1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ea34ba1c793586a71ec5e955013218677d28ff96))
* **tasks:** enhance task completion logic and add tests for alternative task handling ([22a443f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/22a443fdb324c46d36ad5cfea31a42e1884c5754))
* enhance task filtering and UI components with improved imports and localization ([e77cc37](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e77cc37954000d6816fbf9a397cfbcc5f9131baf))
* enhance TaskCardHeader with dynamic linking and improved tooltips ([f917374](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f9173743d466307226d814dd62d796f8e25b07da))
* Enhance team collaboration features and improve code quality ([19f1c0e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/19f1c0e5367a6aa98f96b6e28b11e9cf5cc142fe))
* Enhance team management with join code and owner_id support, and synchronize user's team status in `user_system`. ([43949f0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/43949f06c9477d88b896c075c4af90846875231e))
* Enhance team member card with owner badge and improve team invite link management with show/hide and copy functionality. ([2e0ddfc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2e0ddfc6f25288865c1bd56be74be44fa7a02061))
* **team:** enhance team store and options ([b25c906](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b25c9062cbc96be2dd4eb8300b1d5fe440c9f5a7))
* enhance tooltip functionality and internationalization support ([5b96ce8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5b96ce82891e64985d0a0d3f5c7f9562b56e8c6c))
* enhance UI components and improve localization ([abc8b47](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/abc8b471f38651cef1fc017360337c6dcf844348))
* enhance UI components with extract badge styles and improve item interaction text ([3a238de](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3a238deb9d6f5e04e7aa2d76f5cfb0f9d45f45a6))
* enhance UI components with improved styling and highlight features for better user experience ([745184e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/745184e22713f92da123ce289d5aeadc3252df55))
* enhance UI configuration and improve TaskCard visibility; add sorting options in needed items ([f32cc62](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f32cc629a5b15a378e1ab650487e298f11e61d7e))
* enhance useInfiniteScroll with improved stickToBottom functionality and auto-load cycle management ([e592725](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e5927252de42bbf2c87db7078a4a558f93e22759))
* enhance user display name handling and update API routes to v2 ([0eebe3d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0eebe3dfc9003d9214524a6f2807b8403501685f))
* **i18n:** expand localizations for new features and improve consistency ([3251a2a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3251a2ad2b0a036385de25e18f242f4042908f10))
* expand needed items filters and craft indicators ([d78f605](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d78f605dad7fc2728ccafac0327853476c59e319))
* expand task metadata pipeline and progress repair ([fea757f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/fea757f43b21aeacc2a5eab16c25856b2bf9d109))
* filter tasks by edition ([3807441](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3807441c5cbe6857b5d2b47ba725d77b6557d741))
* fix various minor layout issues, improve task/ objective highlight when jumping to task from map, link find objective on map to find and hand over objective in the task card ([568e492](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/568e492089602444dd9c704560d0aa7d1e234179))
* **tasks:** group global tasks in map view section ([8faa80d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8faa80d9a982f20b7dc9af53d7def46504cde276))
* **api:** harden cache and protection config ([470698d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/470698db463b3ce2ddc3f9de9bce310ef1cf5429))
* harden map layer reload cancellation and sync pending updates ([66957fd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/66957fd27d13d5918e5fcc47cc1294fa6833a568))
* **tasks:** hide map-complete tasks and add visibility toggle ([#116](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/116)) ([1cf497a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1cf497a552e664151325818b9d6f989dcdc09e33))
* Implement a centralized logging utility and add a codebase review document. ([f042ccb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f042ccb307526ec04e6acf81792f644adbffd014))
* **api:** implement API task update handling and metadata tracking ([b917ced](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b917ced5b5ef7bd317969e2348826e6a0755681a))
* Implement API token management and refine team RLS policies ([619c42c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/619c42c66c8bac524f873650802e3f0db0b1cb0e))
* implement comprehensive GitHub workflow system ([cb73a0b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cb73a0bbe716ff47209ff2a75d29c54afa2a7cab))
* implement confidence rating and pace dampening helpers ([bc52aef](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/bc52aef0cc2a6093b3655dd444dd2cf3598b4091))
* implement critical cache check to skip loading screen ([2456105](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/24561058e194859ec18d5620d9a756c75b0d7549))
* implement critical path floor calculation for kappa tasks ([6c0202f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6c0202ff0b7e811f1850d372f7401cff2299a418))
* implement item distribution logic and enhance UI components for better user experience ([a1eef5e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a1eef5e58e2e139750b3c2eaa5959c40df73d25b))
* Implement multi-layer caching for Tarkov API data using IndexedDB ([f0e3ca7](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f0e3ca7af6e22cc1b4b585126c7dcb294e068162))
* **tasks:** implement notification auto-close and close button functionality ([5a0a842](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5a0a84236d4192fb126f122b2ac27527c125ee9a))
* implement prototype pollution prevention in objectPath utility ([6126fe3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6126fe3096416305e24460dfae48ccc4a24dbf81))
* implement skill level input and validation in useSkillCalculation ([85b11a0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/85b11a0547ddc3df43f08d42c7596bbe53a9b0e0))
* Implement Supabase Edge Functions, new UI components, and refactor data fetching and page structure. ([e400b2c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e400b2ce10b038cceb26b01d9a23e90f54879962))
* Implement Supabase-backed user preferences and enhance state synchronization logic ([84e8864](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/84e88644d0a677ad2602603f952c02a11b27ee91))
* Implement team invite acceptance and member kicking, add skill tracking, and optimize Supabase RLS policies and indexing. ([2425fb9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2425fb9b82560d769d71ec55b3fbdde7845781a6))
* improve account deletion and update edge functions ([d23fb2b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d23fb2baffff91234c7b74a763345edf9bb87f4f))
* **app:** improve changelog feed ([757fbad](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/757fbad2a255712a7b51b2b794d8ba2537b66ba7))
* **ui:** improve component accessibility, type safety, and UX ([df30387](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/df30387f16b7da48294d7fe6c31ce7b22e5d2bd7))
* **ui:** improve dashboard components ([87739e9](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/87739e9e2d6b261c8b195de7037c2d18b1a67310))
* **hideout:** improve filtering and add prereq modal composable ([3fd8df2](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3fd8df2c092fd32541d345da10290fd234494014))
* improve HideoutCard UI by removing unnecessary elements and enhancing styles ([d92b5e0](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d92b5e087967bf4a1ccefe5f322479a9f0c8ebd4))
* **app:** improve map floor logic, fix race conditions, and localize settings ([8f18104](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8f181046c20d5887f1f8ad7c33c209434bc933fc))
* improve mobile responsiveness for app bar and navigation drawer ([e35de59](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e35de592d0496c723525133cad0d803ad8fea9c1))
* **api:** improve server caching and API protection ([0bfdc79](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0bfdc79a4359552c7400942f5ee0768127274932))
* improve task card UI and objective grouping logic ([8e59103](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8e59103d8fb2c8e57c85e8222981dee95f0a63ac))
* improve task objective counts and accessibility ([c2d2a20](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c2d2a201a30347c4af6600841590a850fbf9f13a))
* **neededitems:** improve type safety and add team item filtering ([6bf2f67](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/6bf2f6747ba6d6600f2596406625875794ea0498))
* improve UI components and task display ([ec6ae41](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/ec6ae41f90ea6db7e5536db493758a86a24f5d34))
* initialize Nuxt project with essential files and configurations ([5f33e78](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5f33e78f0853cb244d0abf526624da456d39c2fd))
* **oauth:** integrate Supabase for OAuth handling and remove legacy API endpoints ([03f9893](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/03f989379eaa69ea8986ff425839e028b0233e66))
* **hideout:** integrate URL filter sync into hideout page ([5d0dfd3](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5d0dfd3af8b914cf1eff28c8da85da16e41f12fd))
* introduce ObjectiveRequiredEquipment component and enhance UI with updated color themes ([86ab218](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/86ab21895e0278d179db170a70f83e935752cbde))
* **app:** localize loading screen, add global tasks section, and clean up stale locale keys ([92d091b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/92d091b97ac5d7daa39860908b166d58555afd8b))
* localize reset confirmations ([eccfb2c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/eccfb2c92ae3e53036d08ffeefcce8ea6fc9d35a))
* make game mode switching asynchronous and refresh all data ([87cde9d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/87cde9dbbd8151c546f03d73d80bd8eb42a47e22))
* map view tooltip enhancements ([b0ee85f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b0ee85fd9d0a70fbdbfb928667550ee34927fc89))
* mask sensitive account data by default in settings ([48c757b](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/48c757b165ab5a73aaa6666510b5867613ab01e1))
* **team:** modernize team page UI and fix team data bugs ([0791d42](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0791d422e6fb5099a785741c06dc02ed3781b27e))
* **settings:** move API tokens to account page, add redirect notice ([b184b98](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b184b9872caa0bd1bb883b949258ddf9a09a1081))
* **maps:** move reset view button into native Leaflet zoom control ([c15b8b4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c15b8b4961ded510df12dfff701b10cdf09547d6))
* Normalize team gateway paths to accept trailing slashes and update documentation. ([612f24d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/612f24d46ab5051dfb4f511fb604e05472325b6d))
* **ui:** polish components and improve accessibility ([762b29e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/762b29e661fca7c97fc596f903a8949897445a57))
* **streamer:** polish overlay widget CSS — spacing, typography, animations ([5ea9e27](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5ea9e27ee1dca4f41e58de5ee5c9340dfb1b84b2))
* **settings:** polish settings cards ([c1af191](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c1af191ac47bbaedfdf554e13ba4bf908dd175c2))
* **ui:** polish shell components and drawer layouts ([75de088](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/75de0885724afc012914f07ef7ce7b1e70f2997a))
* production readiness improvements with data management and review fixes ([b67ca6c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b67ca6c4ac832b49fc107dfd293da2d08afa95a9))
* reduce Supabase egress usage ([1a10795](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1a107956965b8686afcfa9553763bbe3b09383aa))
* Refactor API caching with `useEdgeCache`, introduce `GameItem` component, and enhance team management. ([2e9e804](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2e9e8040e50919ffcc1ab138c9ae2aaf2cffd17b))
* refactor NeededItemsFilterBar layout for improved filter and view controls ([407f17f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/407f17f88ba68249d1d0e54c4ed9461bdd5e4a43))
* **tasks:** refactor task page and extract composables ([b03ae64](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b03ae648489d79a24fd7a4904b748bcc2d74484c))
* **shell:** refine app shell interactions ([3f28523](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3f28523c65ae824bac309995a6196dccb8a5bef2))
* **app:** refine auth flow ([5a44dd1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5a44dd150c73cdcba184ac61a6f3bef6ab019bac))
* refine credits page ([a776c02](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a776c022fdb6082a3bf29e59ae6f24e4a538940d))
* **tasks:** refine filters and cards ([2862b6d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/2862b6d05f2897b5003de887963c9009a0519fb1))
* **ui:** refresh tracker feature surfaces ([d25c1e5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/d25c1e5c9a518bb359dc73791295385d4ada61eb))
* remove api gateway kv usage ([01d187c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/01d187c0ecc7776797b6ef706a40ad01cdd8be61))
* resolve TT-203 through TT-217 issue batch ([cf5c2c1](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/cf5c2c1d1b3fe164c049bd162eb74349781ddcdd))
* **ui:** restructure streamer tools config page into focused card sections ([723b160](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/723b160560881da4f3a09e51aa17b1779657cd10))
* **settings:** rewrite page as vertical card flow ([8e38e9d](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8e38e9da845785eaf12c56ea4c09baa30b96e474))
* **map:** shift+scroll zoom, ctrl+scroll floor cycling ([#49](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/49)) ([0c16b40](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/0c16b40d1bbfb360a07c3512beef9ce431a4523b))
* show collapsible instructions on linked profile import card ([1f7bc3c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/1f7bc3cc1d1cddf4fb9bf2f943e48c1801d89d07))
* **map:** show extract names on map markers ([#110](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/110)) ([94a1724](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/94a1724ff9a9233c264f07be07c6b6f2d6106817))
* show global tasks in map view ([#113](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/113)) ([259b8e4](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/259b8e4c1e34f761209c45a6c89bc2057a4a81c6))
* **tasks:** show requirement statuses and blocked reasons on task cards ([42030ff](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/42030ff8d9b69a98f98c65303692e66d9b3208ee))
* simplify hover effects and improve cursor styles for single-item cards ([e7f5c9e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e7f5c9e20370d7d07454141e666cad80caa1fbcd))
* surface needed-by and optimize task lookups ([c53b512](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c53b512704320e11b96d1e8b531c10c055cf57a1))
* **i18n:** sync German translations with English locale ([8df16bd](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/8df16bdf3819c5e34dfab1be36974977debdcbc1))
* **ui:** tighten task traders and needed-items scrolling ([7f3b54e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/7f3b54e66983ee7ac2851c8fb747469ba070f0bf))
* **tasks:** track manual vs automatic task failures ([47ff0ea](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/47ff0eafafc248633da47fef7ba87137c56b429a))
* UI improvements and component refactoring ([b6c2ac5](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b6c2ac5058a9e22edea5d0b6ef0d7cd3d2f8f72e))
* update AppFooter and NavDrawer styles for improved UI ([00c2c74](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/00c2c74efa5cd3222273f285aa276b7152e500f3))
* update background color styles for improved UI aesthetics ([debb01c](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/debb01c2ed0d3be44fc300d44ff87aaba816b53c))
* **i18n:** update chinese translation ([e88cc78](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/e88cc78417efbf7d788e69c359aa2f76d0ba2a38))
* Update comprehensive analysis document with architecture overview, technology stack, and identified issues ([efb990a](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/efb990a0378b395d1d7250455c2ff2ae4af3431d))
* update localization strings ([30f079e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/30f079e800a9418039728fbefe542f9ace1dc788))
* **api-gateway:** update OpenAPI validation and configuration, add API_HOST variable ([a5e34ad](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a5e34ade788c3353733a99837e4ac33abe33791e))
* **ui:** update page layouts and error states ([c0d6709](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/c0d6709258520e21c70cdec3a0aec272502f0410))
* **settings:** update settings UI and skills card ([5c1a63f](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5c1a63fccdf202c2a4111df7839fed46abf3498b))
* Update Supabase client imports and enhance token management functions ([3344590](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/33445908a671bc4e191595fc84d827464fec125b))
* **i18n:** update translations for all locales ([a8eaa6e](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/a8eaa6eb9e68ceef4ebce3a92dbbe172cc7b48ef))
* **i18n:** update welcome message to include user display name across multiple languages ([f329f16](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/f329f16f04c5d5239f31de96f953d9501d835070))
* wire critical path floor, dampening, and confidence into kappa projection ([3b64aa6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/3b64aa6e32d4686daee0efe99a0bac245031b9dc))


### Performance Improvements

* **api:** implement LRU eviction for changelog stats cache ([16ba186](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/16ba1867bd5ad586515afb99aa7fd8554760351e))
* memoize levels and harden dashboard fallback ([77f9aa8](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/77f9aa84b0d7b3f9c39ae02d920c2b5b66018ad0))
* remove graphology from initial client bundle ([5315acb](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/5315acbf176b60610b9b378ef01e7b50ad70d522))


### Reverts

* Revert "chore(deps): move dev tools from dependencies to devDependencies" ([b2950dc](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/b2950dc22d75a5172a96495a4de3a8c25539b994))
* Revert "feat(ci): add CI/CD automation, git hooks, and dev tooling ([#142](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/142))" ([#154](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/154)) ([fb38b32](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/fb38b32f91bd5a30a4b13d6b959a407f128c4461))
* Revert "Revert "feat(ci): add CI/CD automation, git hooks, and dev tooling (#…" ([#155](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/issues/155)) ([dab55c6](https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/commit/dab55c6aa4c79d41967079b509783c8ae77b14ee))

## [1.15.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.15.0...v1.15.1) (2026-02-24)


### Bug Fixes

* add required github headers for contributors api ([f2a35cd](https://github.com/tarkovtracker-org/TarkovTracker/commit/f2a35cd11a0e32b64f75caefb4489fcafbd95dca))
* update credits retry click handler and contributor fetch flow ([a3bbfbb](https://github.com/tarkovtracker-org/TarkovTracker/commit/a3bbfbb1dc6f712f9922fffc33198b05c853dc58))

# [1.15.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.14.1...v1.15.0) (2026-02-24)


### Features

* **app:** add birthday dashboard banner and contributor credits ([f16454c](https://github.com/tarkovtracker-org/TarkovTracker/commit/f16454c23ba31580d8c2ac4c3936420c0c8b7d82))

## [1.14.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.14.0...v1.14.1) (2026-02-24)


### Bug Fixes

* **contributors:** cache GitHub contributors server-side ([8226f62](https://github.com/tarkovtracker-org/TarkovTracker/commit/8226f62fcb3801a3a6fb942f7a4dd776493dfb3d))

# [1.14.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.7...v1.14.0) (2026-02-24)


### Features

* resolve TT-203 through TT-217 issue batch ([cf5c2c1](https://github.com/tarkovtracker-org/TarkovTracker/commit/cf5c2c1d1b3fe164c049bd162eb74349781ddcdd))

## [1.13.7](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.6...v1.13.7) (2026-02-23)


### Bug Fixes

* **auth:** stabilize OAuth loading lifecycle ([a21914b](https://github.com/tarkovtracker-org/TarkovTracker/commit/a21914b620b9543bfd64325cca04ef202de6354c))

## [1.13.6](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.5...v1.13.6) (2026-02-23)


### Bug Fixes

* always restore original mode after tarkov.dev import failure ([#218](https://github.com/tarkovtracker-org/TarkovTracker/issues/218)) ([597b5d4](https://github.com/tarkovtracker-org/TarkovTracker/commit/597b5d4db6344032e7a9a4a808e137b977e1de78))

## [1.13.5](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.4...v1.13.5) (2026-02-23)


### Bug Fixes

* **hideout:** stabilize route sync watcher and es copy ([16775ce](https://github.com/tarkovtracker-org/TarkovTracker/commit/16775ce4af27e478a1ee6b98f36b07551808c414))

## [1.13.4](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.3...v1.13.4) (2026-02-23)


### Bug Fixes

* **app:** clarify sync/local toast causes and add integration coverage ([#199](https://github.com/tarkovtracker-org/TarkovTracker/issues/199)) ([8bba503](https://github.com/tarkovtracker-org/TarkovTracker/commit/8bba503042a37869334c00c1bc1fda1436e6d87d))

## [1.13.3](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.2...v1.13.3) (2026-02-23)


### Bug Fixes

* **tasks:** avoid collector grouping spam while preserving quest-item splits ([#198](https://github.com/tarkovtracker-org/TarkovTracker/issues/198)) ([4968d5e](https://github.com/tarkovtracker-org/TarkovTracker/commit/4968d5ee3b1b6c19bad848f0041e72df17d95890))

## [1.13.2](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.1...v1.13.2) (2026-02-22)


### Bug Fixes

* **tasks:** block complete action on failed tasks and derive branch failures ([a6f9e23](https://github.com/tarkovtracker-org/TarkovTracker/commit/a6f9e23307a4d03b74c30620091349678e97abd9))

## [1.13.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.13.0...v1.13.1) (2026-02-22)


### Bug Fixes

* **tasks:** apply search filter to map markers ([2dd31c1](https://github.com/tarkovtracker-org/TarkovTracker/commit/2dd31c116b18f7b9c9e0a5f683113d812907ec80))

# [1.13.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.7...v1.13.0) (2026-02-22)


### Features

* **settings:** clarify EFT log import when logs are cleared ([1d935e8](https://github.com/tarkovtracker-org/TarkovTracker/commit/1d935e81ccceea417e55b19f14baff14d2622258))

## [1.12.7](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.6...v1.12.7) (2026-02-22)


### Bug Fixes

* **version:** use release app version and remove tarkov version config ([a71b361](https://github.com/tarkovtracker-org/TarkovTracker/commit/a71b3618f9ef92eedbc7d8737ea78be1cc25c813))

## [1.12.6](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.5...v1.12.6) (2026-02-22)


### Bug Fixes

* **tasks:** handle merged map ids in objective visibility ([#197](https://github.com/tarkovtracker-org/TarkovTracker/issues/197)) ([877cfd3](https://github.com/tarkovtracker-org/TarkovTracker/commit/877cfd3c3f7366dd6695e5fc7e9458b552731d8f))

## [1.12.5](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.4...v1.12.5) (2026-02-22)


### Bug Fixes

* **a11y:** complete keyboard focus coverage for issue [#103](https://github.com/tarkovtracker-org/TarkovTracker/issues/103) ([e6fcbd7](https://github.com/tarkovtracker-org/TarkovTracker/commit/e6fcbd714a101d86ea64b4f48b761c9632f4e7d6))

## [1.12.4](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.3...v1.12.4) (2026-02-22)


### Bug Fixes

* **tasks:** correct map objective ownership and harden issue [#126](https://github.com/tarkovtracker-org/TarkovTracker/issues/126) regressions ([af5df94](https://github.com/tarkovtracker-org/TarkovTracker/commit/af5df9479d26fe32645d2a48c21cf27c567f5ad6))

## [1.12.3](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.2...v1.12.3) (2026-02-22)


### Bug Fixes

* **maps:** restore map tooltip links for wiki and tarkov.dev ([c6634a9](https://github.com/tarkovtracker-org/TarkovTracker/commit/c6634a9a1638e10614fadf471c617185b3353bd6))

## [1.12.2](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.1...v1.12.2) (2026-02-22)


### Bug Fixes

* preserve storyline progress in user_progress sanitizer ([#193](https://github.com/tarkovtracker-org/TarkovTracker/issues/193)) ([6bee534](https://github.com/tarkovtracker-org/TarkovTracker/commit/6bee5342e9faf022fa57c232b76be2fde21355a8))

## [1.12.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.12.0...v1.12.1) (2026-02-22)


### Bug Fixes

* **tasks:** align Lightkeeper filter counts with task list logic ([#192](https://github.com/tarkovtracker-org/TarkovTracker/issues/192)) ([2487591](https://github.com/tarkovtracker-org/TarkovTracker/commit/2487591c325430297bd28a6947c208bcd5300b8f))

# [1.12.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.11.0...v1.12.0) (2026-02-22)


### Bug Fixes

* address map summary PR review blockers ([4704381](https://github.com/tarkovtracker-org/TarkovTracker/commit/4704381c887cdfb58348715a3e0fea96aa099c0c))
* prepare nuxt eslint config in lint scripts ([4423b82](https://github.com/tarkovtracker-org/TarkovTracker/commit/4423b822ea60340777c8089a52921ed0ddf93704))
* sync api-gateway lockfile with package deps ([052ed0f](https://github.com/tarkovtracker-org/TarkovTracker/commit/052ed0fa1ac03c97902a604f88b8cba0908904d4))


### Features

* Adds a required equipment summary tracking per map ([e185baa](https://github.com/tarkovtracker-org/TarkovTracker/commit/e185baaa417d73b7b1793c7fcbcde45efe65d696))

# [1.11.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.10.1...v1.11.0) (2026-02-22)


### Bug Fixes

* localize EFT logs import messaging ([da4e4df](https://github.com/tarkovtracker-org/TarkovTracker/commit/da4e4dfc64c87d5e7347a60387b288d44e8ac7d4))


### Features

* add EFT logs import support ([483dc51](https://github.com/tarkovtracker-org/TarkovTracker/commit/483dc515e5135253bc380047cc89df138b0546dd))

## [1.10.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.10.0...v1.10.1) (2026-02-21)


### Bug Fixes

* gate nuxt dev-only modules outside production ([8898f58](https://github.com/tarkovtracker-org/TarkovTracker/commit/8898f5806fa1025f6ea958ec45af4ab2deda20bc))

# [1.10.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.9.0...v1.10.0) (2026-02-21)


### Bug Fixes

* **tasks:** allow expanding completed quest objectives when collapse pref is on ([ef8e18f](https://github.com/tarkovtracker-org/TarkovTracker/commit/ef8e18f1a067cc20f4ad742bd4adbfe01ea56c36)), closes [#181](https://github.com/tarkovtracker-org/TarkovTracker/issues/181)


### Features

* **drawer:** add settings link to navigation drawer ([56d7fb9](https://github.com/tarkovtracker-org/TarkovTracker/commit/56d7fb9e7a2c46e1f6546fc6b31bb1ad19ab4284))

# [1.9.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.8.2...v1.9.0) (2026-02-21)


### Bug Fixes

* **app:** apply pending auth profile team and test updates ([60821de](https://github.com/tarkovtracker-org/TarkovTracker/commit/60821de1076d8d4b10dd9386b38567940e3ebcc6))


### Features

* production readiness improvements with data management and review fixes ([c5e67ab](https://github.com/tarkovtracker-org/TarkovTracker/commit/c5e67ab4570646d04fb73d4788313169d2607fca))

## [1.8.2](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.8.1...v1.8.2) (2026-02-18)


### Bug Fixes

* **api:** forward streamer internal fetch headers in production ([b7182cd](https://github.com/tarkovtracker-org/TarkovTracker/commit/b7182cd24dc5e0fc3fe2411eda74b96702e984dc))

## [1.8.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.8.0...v1.8.1) (2026-02-18)


### Bug Fixes

* **streamer:** avoid false private overlay on protected internal fetch ([0c761c3](https://github.com/tarkovtracker-org/TarkovTracker/commit/0c761c3b7a759d80df4c86a8ca091dbb72b1c664))

# [1.8.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.7.0...v1.8.0) (2026-02-18)


### Bug Fixes

* **api:** harden shared profile and team endpoint caching ([6659dcd](https://github.com/tarkovtracker-org/TarkovTracker/commit/6659dcdf7832ac569eb632aecc95b0442124b688))
* **app:** harden supabase sync and oauth login flows ([6a5cd53](https://github.com/tarkovtracker-org/TarkovTracker/commit/6a5cd53af1a265828963b79dbd2382ad137ee3b8))
* **maps:** link objective tooltip title to wiki ([28ee9f1](https://github.com/tarkovtracker-org/TarkovTracker/commit/28ee9f15a7304938a5d7136b6ea2d65765b4a4be))
* **tasks:** override Duck Hunt duck pate objective icon ([f7a305d](https://github.com/tarkovtracker-org/TarkovTracker/commit/f7a305dcc5ebf4f65ee7ce2c343a37a10a37ae2e))


### Features

* **app:** add client and server error monitoring pipeline ([9d5637b](https://github.com/tarkovtracker-org/TarkovTracker/commit/9d5637ba4e26f16bd1119f0c50bc0c0c6aae1fce))
* **app:** add storyline chapter tracking and chapter card refactor ([c2ff064](https://github.com/tarkovtracker-org/TarkovTracker/commit/c2ff064fbd8960bbb2c9b5e263ec17aa076aa67d))

# [1.7.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.6.1...v1.7.0) (2026-02-17)


### Features

* **needed-items:** centralize settings and separate handover state ([4189ae2](https://github.com/tarkovtracker-org/TarkovTracker/commit/4189ae2dd8405d83c5b88074f43ca0e6c893d16f))

## [1.6.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.6.0...v1.6.1) (2026-02-17)


### Bug Fixes

* **import:** map memberCategory 1024 to unheard only ([79ae93f](https://github.com/tarkovtracker-org/TarkovTracker/commit/79ae93fb33d7a3cf6cd2296c9393e07786b2585f))

# [1.6.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.5.0...v1.6.0) (2026-02-17)


### Features

* show collapsible instructions on linked profile import card ([3678d53](https://github.com/tarkovtracker-org/TarkovTracker/commit/3678d534068bde0ae381927b881589aa303048e3))

# [1.5.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.4.0...v1.5.0) (2026-02-17)


### Features

* add tarkov.dev profile import, profile tabs, and map TS hardening ([6636661](https://github.com/tarkovtracker-org/TarkovTracker/commit/66366618b49e6ee84927a21f05c9f3be38008466))

# [1.4.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.6...v1.4.0) (2026-02-16)


### Features

* **maps:** add adjustable zone overlay opacity setting ([1c365e6](https://github.com/tarkovtracker-org/TarkovTracker/commit/1c365e6856bc8b25e5b5be397672d676786e410a))

## [1.3.6](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.5...v1.3.6) (2026-02-15)


### Bug Fixes

* **streamer:** forward host header on internal $fetch to pass API protection ([b1792fa](https://github.com/tarkovtracker-org/TarkovTracker/commit/b1792fab21e8bd18d191cba8011d837461abe844))

## [1.3.5](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.4...v1.3.5) (2026-02-15)


### Bug Fixes

* **profile:** align stats logic and add targeted tests ([e3e5970](https://github.com/tarkovtracker-org/TarkovTracker/commit/e3e59706a7ad7bd4dd94671d36d1f1eef70c84d1))

## [1.3.4](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.3...v1.3.4) (2026-02-15)


### Bug Fixes

* **profile:** exclude invalid/unreachable tasks from progression totals ([110807b](https://github.com/tarkovtracker-org/TarkovTracker/commit/110807b5e7857fa76a080e5d1d65c02a9ce24373))

## [1.3.3](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.2...v1.3.3) (2026-02-15)


### Bug Fixes

* **i18n:** add missing profile_sharing locale keys ([7a0b400](https://github.com/tarkovtracker-org/TarkovTracker/commit/7a0b4002d377a59162dd5346c5a8d1748bf90e1f))
* resolve shouldLog redeclaration conflicts ([ef259a0](https://github.com/tarkovtracker-org/TarkovTracker/commit/ef259a06fe4f2d976951a1ac940c718f28f0645b))

## [1.3.2](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.1...v1.3.2) (2026-02-15)


### Bug Fixes

* accept SB service key alias in runtime config ([c909493](https://github.com/tarkovtracker-org/TarkovTracker/commit/c909493a06b332250d13ad78709efedbd1a290ff))

## [1.3.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.3.0...v1.3.1) (2026-02-15)


### Bug Fixes

* **test:** add missing mock properties for useSupabaseSync return type ([0d56fc4](https://github.com/tarkovtracker-org/TarkovTracker/commit/0d56fc4ebf2d76fb12e6cfd7bc722c1dc47dca5b))

# [1.3.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.2.1...v1.3.0) (2026-02-15)


### Bug Fixes

* address remaining PR review issues ([ad0dc1c](https://github.com/tarkovtracker-org/TarkovTracker/commit/ad0dc1c81277b48879684282f03a9cbc36f55a0a))
* **tasks:** prevent early returns from skipping sort/sortDir sync ([37355f8](https://github.com/tarkovtracker-org/TarkovTracker/commit/37355f86db49d6a140647d4d2f712692016ade59))
* **tarkov-store:** stop repeated local ignored toast on refresh ([76ba925](https://github.com/tarkovtracker-org/TarkovTracker/commit/76ba9250c56229b260c37b98e04c69555e805fb7))


### Features

* **neededitems:** add filter type and sort validators ([5f8c138](https://github.com/tarkovtracker-org/TarkovTracker/commit/5f8c138742ae37df5e8ef2979d6431fefd27ba0c))
* add generic useRouteFilters composable ([6b22386](https://github.com/tarkovtracker-org/TarkovTracker/commit/6b223865d178c406d166633c497420da8d430924))
* **types:** add sort mode and direction validators ([2fe96d8](https://github.com/tarkovtracker-org/TarkovTracker/commit/2fe96d84dddfe0384d833ccafe54969bdad68fd1))
* **hideout:** add useHideoutRouteSync for URL filter state ([34f1a31](https://github.com/tarkovtracker-org/TarkovTracker/commit/34f1a317b3b7e2fd7af374efe98d315a421e267d))
* **hideout:** integrate URL filter sync into hideout page ([a995461](https://github.com/tarkovtracker-org/TarkovTracker/commit/a995461bc0679752e618bf717628f57799e5d84e))

## [1.2.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.2.0...v1.2.1) (2026-02-15)


### Bug Fixes

* **tasks:** address PR review — revert objective.item, truncate instead of drop, rename constant ([bdc2b5e](https://github.com/tarkovtracker-org/TarkovTracker/commit/bdc2b5e8733043fdf1c7f9f3bc37ad85a6ae80d8))
* **tasks:** cap any/sell objective item rendering ([23ba8b0](https://github.com/tarkovtracker-org/TarkovTracker/commit/23ba8b081f957fb464d9e0b68a16eeab781bef62))
* **tasks:** include objective.item in equipment aggregation ([210188c](https://github.com/tarkovtracker-org/TarkovTracker/commit/210188c5c299a458ed4e9c1738184839c16912ae))

# [1.2.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.1.0...v1.2.0) (2026-02-15)


### Bug Fixes

* add cycle detection to critical path walker and fix relative import ([c1a524d](https://github.com/tarkovtracker-org/TarkovTracker/commit/c1a524deba114371617d4c35ca6f748f93f3a5fd))
* **tests:** restore originalFetch assignment in kappa.test.ts ([3d72a29](https://github.com/tarkovtracker-org/TarkovTracker/commit/3d72a2938c388705cfb6ae95b9ba330134e6b176))


### Features

* add profile sharing, streamer overlay enhancements, and security hardening ([b745d63](https://github.com/tarkovtracker-org/TarkovTracker/commit/b745d6333bd41b24675b1e7ab98c273953b16f30))
* **settings:** create TaskDisplayCard, MapSettingsCard, and PrivacyCard components ([fc17b0b](https://github.com/tarkovtracker-org/TarkovTracker/commit/fc17b0b988df104af1eeb77c1c511d8a8230689a))
* implement confidence rating and pace dampening helpers ([4ac632e](https://github.com/tarkovtracker-org/TarkovTracker/commit/4ac632eac6ddbba174d6b7f8d3c432cd32c4835e))
* implement critical path floor calculation for kappa tasks ([7e2cb3b](https://github.com/tarkovtracker-org/TarkovTracker/commit/7e2cb3b4809c02211d6093428e0a3f946b17cbbe))
* **settings:** move API tokens to account page, add redirect notice ([02af671](https://github.com/tarkovtracker-org/TarkovTracker/commit/02af6710ebe399853d986e625413e71296e26ac8))
* **streamer:** polish overlay widget CSS — spacing, typography, animations ([f872177](https://github.com/tarkovtracker-org/TarkovTracker/commit/f87217769675a03baacf931ab3e0817a40d1379f))
* **ui:** restructure streamer tools config page into focused card sections ([c7f10ef](https://github.com/tarkovtracker-org/TarkovTracker/commit/c7f10ef4100f8b65dcda0d6801ab936cd4eb7679))
* **settings:** rewrite page as vertical card flow ([4f93d53](https://github.com/tarkovtracker-org/TarkovTracker/commit/4f93d53e1129e259165c0ac14a4378b366f8dc7f))
* wire critical path floor, dampening, and confidence into kappa projection ([1938dec](https://github.com/tarkovtracker-org/TarkovTracker/commit/1938dec8f97d0fe1c0d7d1002b6d252609938614))

# [1.1.0](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.0.4...v1.1.0) (2026-02-13)


### Bug Fixes

* **tasks:** catch map objective jump errors ([b0df877](https://github.com/tarkovtracker-org/TarkovTracker/commit/b0df877b64e44a47abf79d66c6a00d83b652a3ef))
* **tasks:** re-expand map panel on objective jump ([6ce11d3](https://github.com/tarkovtracker-org/TarkovTracker/commit/6ce11d3c7e5db4101c561bb0cd1c75b26f1ba392))


### Features

* **tasks:** add collapsible map panel and map time badges ([bae249f](https://github.com/tarkovtracker-org/TarkovTracker/commit/bae249f214c6ecc9b48aaa301053e1d66b3981b4))
* **app:** allow collapsing tasks in map view ([590fc84](https://github.com/tarkovtracker-org/TarkovTracker/commit/590fc84785eee633fc9c0f9d02fc505979f80c2a))
* **app:** allow collapsing tasks in map view ([bee55eb](https://github.com/tarkovtracker-org/TarkovTracker/commit/bee55eb9ddd71e2b7c01c7b4a850b04ee1cd3226))

## [1.0.4](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.0.3...v1.0.4) (2026-02-13)


### Bug Fixes

* **ci:** sync api-gateway lockfile with worker deps ([636e685](https://github.com/tarkovtracker-org/TarkovTracker/commit/636e685436c53a72f80c71a54ff2c510253eb11d))

## [1.0.3](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.0.2...v1.0.3) (2026-02-13)


### Bug Fixes

* **app:** differentiate objective defaults and harden user_system admin writes ([64fa239](https://github.com/tarkovtracker-org/TarkovTracker/commit/64fa239c48fa1319ade3175b1261fb66da7d3f4f)), closes [#98](https://github.com/tarkovtracker-org/TarkovTracker/issues/98)

## [1.0.2](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.0.1...v1.0.2) (2026-02-12)


### Bug Fixes

* use setLocale API for locale switching and add test coverage ([2348a0a](https://github.com/tarkovtracker-org/TarkovTracker/commit/2348a0a063b223492fa57b568ca9a80eeb931919))

## [1.0.1](https://github.com/tarkovtracker-org/TarkovTracker/compare/v1.0.0...v1.0.1) (2026-02-12)


### Bug Fixes

* **team-gateway:** validate UUID inputs and stop leaking DB errors to clients ([f573492](https://github.com/tarkovtracker-org/TarkovTracker/commit/f573492faea2a7f23ce7d028e15b3bf7c128caa0))

# 1.0.0 (2026-02-11)


### Bug Fixes

* add context menu focus styles ([4702c97](https://github.com/tarkovtracker-org/TarkovTracker/commit/4702c970f65c3ce89eb5d14d3398fa8fc0519820))
* **i18n:** add explicit useI18n imports and clipboard_copied locale keys ([4cbc468](https://github.com/tarkovtracker-org/TarkovTracker/commit/4cbc4689671461c35168cf2a7525e32212ad0c4e))
* add flex and min-height classes to trader card for improved layout ([791e726](https://github.com/tarkovtracker-org/TarkovTracker/commit/791e726f42760c2cdb685b1e63f2b3f8b34fbbff))
* **store:** add markTaskAsUncompleted and clear stale failed flags during repair ([c11f8a0](https://github.com/tarkovtracker-org/TarkovTracker/commit/c11f8a0aba5a72a97077ca710b8022ffdb16daac))
* **i18n:** add missing map spawn locale keys ([90b7b19](https://github.com/tarkovtracker-org/TarkovTracker/commit/90b7b1995a54821bcbc4979705710940d94ed37d))
* **tasks:** add missing task objective types module ([87116ee](https://github.com/tarkovtracker-org/TarkovTracker/commit/87116eefea6850b452a3ee2f37c59bb2a7a601e8))
* **nuxt.config:** add NUXT_SUPABASE_URL and NUXT_SUPABASE_ANON_KEY for improved configuration ([d85437e](https://github.com/tarkovtracker-org/TarkovTracker/commit/d85437eda9dd6a425faeafa3ea70061a4e6d901b))
* add optional chaining for icon prop and update icon type to optional ([c4b54bf](https://github.com/tarkovtracker-org/TarkovTracker/commit/c4b54bf0eb1be9fac414712981a6c8a6da5aa586))
* **api:** add request timeout to cache-meta and fix import alias ([28b1f52](https://github.com/tarkovtracker-org/TarkovTracker/commit/28b1f528e6aabb7872a6038d222a88092f952071))
* **api:** add retry logic and better error handling for tarkov.dev API ([dfbed88](https://github.com/tarkovtracker-org/TarkovTracker/commit/dfbed8822bee73bca86c7baec7dae8c429c98499))
* **ui:** add Tailwind utilities, fix styling, and use locale keys for ([f29e33f](https://github.com/tarkovtracker-org/TarkovTracker/commit/f29e33f7ddc3e3ab8e94e52f2530dcbba4257fe1))
* **settings:** add usage hint to Skills Management card ([f959ee1](https://github.com/tarkovtracker-org/TarkovTracker/commit/f959ee1d524796ebaeb723833fbb6c6ba29184ed)), closes [#28](https://github.com/tarkovtracker-org/TarkovTracker/issues/28)
* add VITE_ env var fallbacks to server runtime config ([5a84b27](https://github.com/tarkovtracker-org/TarkovTracker/commit/5a84b27df7dd7d955cc703d687130704f37e2389))
* address memory cache type safety and leak concerns ([3fd9fd6](https://github.com/tarkovtracker-org/TarkovTracker/commit/3fd9fd61aa03dcd939c87c506c5fff1caf0400f6))
* **security:** address security lints and tighten privileges in database views and functions ([560f286](https://github.com/tarkovtracker-org/TarkovTracker/commit/560f2864ebc3533c57c66ad6eb4139b007bf45a1))
* **tasks:** align global edge cases, map totals, and ordering ([50f2c03](https://github.com/tarkovtracker-org/TarkovTracker/commit/50f2c0360c973b3e65c0bfe53cada41cbdecb5d5))
* align toast/task fallbacks and map pan speed row typing ([b4b4672](https://github.com/tarkovtracker-org/TarkovTracker/commit/b4b4672b5b73ae4aa587697aa93937e0c327388b))
* allow showing completed objectives on map when filtering by completed/all tasks ([11f8e5c](https://github.com/tarkovtracker-org/TarkovTracker/commit/11f8e5cb12fad684053dfda224c6402ee3a3b508))
* **tasks:** always surface invalid-task status context ([051be2d](https://github.com/tarkovtracker-org/TarkovTracker/commit/051be2dd375335e119b37bd7e447393cf2b77f82))
* **ui:** apply CodeRabbit accessibility and style updates ([3e74a69](https://github.com/tarkovtracker-org/TarkovTracker/commit/3e74a6970df499d2f8338b78a6eb3429c73e315f))
* **needed-items:** apply shared prestige task filtering ([a6499e7](https://github.com/tarkovtracker-org/TarkovTracker/commit/a6499e7905296fd4ce3bc0aef1afe4f16625316f))
* apply task overlay to objectives and rewards ([2f160d3](https://github.com/tarkovtracker-org/TarkovTracker/commit/2f160d34d8f94ca17d4171a1886f2f1fe6130edb))
* avoid resuming stale sync controller ([9f5c3f3](https://github.com/tarkovtracker-org/TarkovTracker/commit/9f5c3f38b325e1741955a90e649a7b92f3aa5f1d))
* carry working changes onto feat/ui-improvements ([3d61a35](https://github.com/tarkovtracker-org/TarkovTracker/commit/3d61a35fa80558942488e3c5ddb9bcfa3695698d))
* change action buttons from soft to outline variant ([fd9dfe9](https://github.com/tarkovtracker-org/TarkovTracker/commit/fd9dfe9e5347e7138dfd44718ce340c1937a2405))
* **store:** change lastApiUpdateIds to a constant for better immutability ([648def5](https://github.com/tarkovtracker-org/TarkovTracker/commit/648def570e6fc4be4ed6435fffbc014fae9a6b1b))
* **settings:** clean up account card and improve test reliability ([c572f3e](https://github.com/tarkovtracker-org/TarkovTracker/commit/c572f3eaee217540e08def7c936fcbb85af5710a))
* **app:** clean up shell components and fix test imports ([651b194](https://github.com/tarkovtracker-org/TarkovTracker/commit/651b1942dcca69941dac116eace076f949182681)), closes [#tests](https://github.com/tarkovtracker-org/TarkovTracker/issues/tests)
* clear search filter when navigating to task via dependency link ([d86d08b](https://github.com/tarkovtracker-org/TarkovTracker/commit/d86d08b02daf9543eefdc29aec237a11b625a826)), closes [#65](https://github.com/tarkovtracker-org/TarkovTracker/issues/65)
* clear stale local state after account deletion ([e86e26d](https://github.com/tarkovtracker-org/TarkovTracker/commit/e86e26dbffb83efe5f62a7d5b8da7b797dcdeda6))
* comprehensive data loss prevention and sync reliability improvements ([d2b5219](https://github.com/tarkovtracker-org/TarkovTracker/commit/d2b5219b5fff13d370e94bb14278dafbde05f0f3)), closes [#71](https://github.com/tarkovtracker-org/TarkovTracker/issues/71)
* correct debounce import path in useSupabaseSync ([c4cb77d](https://github.com/tarkovtracker-org/TarkovTracker/commit/c4cb77dd5c4946d48abfcbe7fdf294d237b712db))
* correct doubled item counts for find+handover task objectives ([55f5917](https://github.com/tarkovtracker-org/TarkovTracker/commit/55f59173d0858d4122216edb0f0234c297d35e47))
* **skills:** correct in-game Endurance sort order ([0e8ed6c](https://github.com/tarkovtracker-org/TarkovTracker/commit/0e8ed6c9ab66f4fcfd27e17161c54806dc69627b))
* correct min-width value in NeededItemsFilterBar component ([1eadcc6](https://github.com/tarkovtracker-org/TarkovTracker/commit/1eadcc6bde197347932aa026077b97c898b5e9ab))
* correct trader level retrieval in isTraderReqMet function ([94973f4](https://github.com/tarkovtracker-org/TarkovTracker/commit/94973f41706a6a39d3cb2dfccaaea60cb4edf672))
* disable trader gating until trader data is ready ([0faab44](https://github.com/tarkovtracker-org/TarkovTracker/commit/0faab4410e0d983825eaeabad602c8f98419445d))
* **tasks:** distinguish fail vs uncomplete when reverting alternative tasks ([061028d](https://github.com/tarkovtracker-org/TarkovTracker/commit/061028d15d1f0b9c2b65fb33fd636541517dce8f))
* **i18n:** Duplicate page.api key at lines 280 and 455 causes translation loss. ([91d669d](https://github.com/tarkovtracker-org/TarkovTracker/commit/91d669d9bf357df6e7a181bbaa3c0cbb197e6183))
* **changelog:** enforce descending date order ([9c2cde7](https://github.com/tarkovtracker-org/TarkovTracker/commit/9c2cde7efca6a4870bcdd82bc31bde27e02e4ca4))
* **oauth:** enhance logging for authorization approval and error handling ([17232ea](https://github.com/tarkovtracker-org/TarkovTracker/commit/17232ea29f5a62781b9921ed71e275dcc44811f7))
* **oauth:** enhance logging for OAuth consent process ([b33ca57](https://github.com/tarkovtracker-org/TarkovTracker/commit/b33ca579fedf5cb18f9745b135bd398744f97c4b))
* **oauth:** enhance redirect handling in callback and login flows ([7622b66](https://github.com/tarkovtracker-org/TarkovTracker/commit/7622b6669ed90eecb6320a1c753f177255c562f1))
* **useInfiniteScroll:** enhance scroll handling and prevent rapid checks during scrolling ([13db6c7](https://github.com/tarkovtracker-org/TarkovTracker/commit/13db6c75639b83884040c8a4bfce668be1d595a7))
* enhance sync error messages with table context ([45992d4](https://github.com/tarkovtracker-org/TarkovTracker/commit/45992d45820d296b1cdca908b31f2d323894bd23))
* **tests:** enhance Vitest configuration for improved isolation and mock restoration ([42e6566](https://github.com/tarkovtracker-org/TarkovTracker/commit/42e6566391f4467a159506e77ef0ed9a31895bd4))
* ensure consistent level display across all UI components ([ba25d2e](https://github.com/tarkovtracker-org/TarkovTracker/commit/ba25d2efe1ab8921a3846fad83ff6120858a7613)), closes [#64](https://github.com/tarkovtracker-org/TarkovTracker/issues/64)
* **tests:** ensure NEW_BEGINNING_TASK_IDS is treated as a constant array ([ff84e4b](https://github.com/tarkovtracker-org/TarkovTracker/commit/ff84e4b2275effc7db74fd1622f8cccf653517cd))
* **i18n:** escape apostrophes in fr locale ([b071706](https://github.com/tarkovtracker-org/TarkovTracker/commit/b071706a3a04bd51c996235fef9b5a4694a8ce5f))
* expose overlay metadata and purge task caches ([ee54208](https://github.com/tarkovtracker-org/TarkovTracker/commit/ee542084f1119585e806b74316071466ca43cee2))
* **neededitems:** filter task objectives by user faction ([3af91dd](https://github.com/tarkovtracker-org/TarkovTracker/commit/3af91ddb03619cc899f535da03f3f915990f3afa))
* **i18n:** fix French locale issues ([1a809ce](https://github.com/tarkovtracker-org/TarkovTracker/commit/1a809ce1e4dd8089bd6fa79f949e9036ab00c7e4))
* **lighthouse:** format assertions for clarity and consistency ([cbb654a](https://github.com/tarkovtracker-org/TarkovTracker/commit/cbb654a7140c9ad4c7a1ef00ea4880b2f971e772))
* **locales:** format notAvailableDescription strings for consistency ([08e99b6](https://github.com/tarkovtracker-org/TarkovTracker/commit/08e99b66b4a3439129e24785124de3dbf5783b33))
* guard initial sync to avoid data loss ([f22be87](https://github.com/tarkovtracker-org/TarkovTracker/commit/f22be876deb9ca00728343ca6c703b5ed2430cfd))
* guard overlay deep merge and apply hideout corrections ([a20d7d6](https://github.com/tarkovtracker-org/TarkovTracker/commit/a20d7d6fc44464cefa309db7f6d6b3bae3f77f5b))
* handle filter changes more robustly by resetting store and managing initial load state ([c31baac](https://github.com/tarkovtracker-org/TarkovTracker/commit/c31baac202d8e18ec1dbe51e1788859fbe06dddd))
* **app:** handle game mode rollback failure and validate changelog dates ([4d11185](https://github.com/tarkovtracker-org/TarkovTracker/commit/4d11185b386d1505db973e2512af23836207c97c))
* handle null rewardItems entries from tarkov.dev API ([83214f5](https://github.com/tarkovtracker-org/TarkovTracker/commit/83214f57faeb553527d1d1adcd0b556761322dd3))
* handle undefined values in GPS coordinates check for map objectives ([5b9718a](https://github.com/tarkovtracker-org/TarkovTracker/commit/5b9718abf2e7a0a844cca59da874067d16ac7dfa))
* harden account deletion and sync flows ([1f7529d](https://github.com/tarkovtracker-org/TarkovTracker/commit/1f7529d78a445b2992ba05061f79047cc16002b7))
* harden cache and server utilities ([25f7161](https://github.com/tarkovtracker-org/TarkovTracker/commit/25f71612d2c02f30fdd37ea1d0b6132c73e051a6))
* harden failed task handling and manual fail flows ([1283b76](https://github.com/tarkovtracker-org/TarkovTracker/commit/1283b7675372814f3de611a38577fc9886de0cd3))
* **tasks:** harden prestige New Beginning task mapping ([734d212](https://github.com/tarkovtracker-org/TarkovTracker/commit/734d212ab2cf32f0398de4d5197809dbb0d368d7))
* **ui:** harden select menu property lookup and add drawer aria labels ([4fc0530](https://github.com/tarkovtracker-org/TarkovTracker/commit/4fc0530aa6db314fe7560e74da0f80f0a0db88f5))
* harden sync and team updates ([ed17fae](https://github.com/tarkovtracker-org/TarkovTracker/commit/ed17fae605936607898ef69727896dd19056b6c1))
* **security:** harden XSS prevention, accessibility, and OAuth lifecycle ([c60ed88](https://github.com/tarkovtracker-org/TarkovTracker/commit/c60ed88b02b34615c8d5068c7a68bbb0f20cdf3a))
* hide completed objectives from map display ([0e7a9b5](https://github.com/tarkovtracker-org/TarkovTracker/commit/0e7a9b5980979b727eb73f3e6c09ac2adf0d85bb))
* **app:** hide dashboard filter notice when progress is collapsed ([f046a4f](https://github.com/tarkovtracker-org/TarkovTracker/commit/f046a4f6275fdf9da45435846a8da64e2e0a6291))
* honor failed prereqs in invalidation ([a13e71f](https://github.com/tarkovtracker-org/TarkovTracker/commit/a13e71f1b9daa60618aab8e533feba05537c6441))
* **ui:** improve accessibility, security, and component consistency ([5323667](https://github.com/tarkovtracker-org/TarkovTracker/commit/532366705c2b00ae6d8804a739d081fe98df06cd))
* **lint-colors:** improve baseline handling and reordering of imports ([188f0c9](https://github.com/tarkovtracker-org/TarkovTracker/commit/188f0c9b182f88bd6d96b069bffe4134163e958d))
* **ui:** improve ContextMenuItem keyboard handling and update icons ([181c1eb](https://github.com/tarkovtracker-org/TarkovTracker/commit/181c1eba28d9ef7134587f2b2f9fcb668bee7e9b))
* **app:** improve error categorization in sync-maps script ([39cdc55](https://github.com/tarkovtracker-org/TarkovTracker/commit/39cdc550f5f3dcf8c51626156c1a1d9151b3a485))
* improve error handling and type safety in cache APIs ([719a75a](https://github.com/tarkovtracker-org/TarkovTracker/commit/719a75a8cf955037405922b6adc87a5c66f8ace9))
* improve error handling for debounced functions ([41ee4b5](https://github.com/tarkovtracker-org/TarkovTracker/commit/41ee4b5873259c57d3fa3af6210f96b5cab3d954))
* **oauth:** improve error handling for expired or processed authorization requests ([61a271b](https://github.com/tarkovtracker-org/TarkovTracker/commit/61a271bd30bb06e7fe2b3bed7556f61794eacfad))
* **app:** improve error handling, logging safety, and remove unused import ([ad28b81](https://github.com/tarkovtracker-org/TarkovTracker/commit/ad28b81b6197b3073d1737020605d1e6cb4b563a))
* **scripts:** improve floor ordering in sync-maps ([3dee175](https://github.com/tarkovtracker-org/TarkovTracker/commit/3dee17512ecdae708b956b9958fd0ab87975ff22))
* **neededitems:** improve infinite scroll reliability for fast scrolling ([f52c372](https://github.com/tarkovtracker-org/TarkovTracker/commit/f52c3721fd1b4642a5de1cfa8ac97b2d2dd99d09))
* **changelog:** improve load more UX, stats coverage, and server caching ([384208a](https://github.com/tarkovtracker-org/TarkovTracker/commit/384208a92de837fa87dc30b4ba74cd19b24df5d2))
* **oauth:** improve logging format for authorization details retrieval ([b7498f7](https://github.com/tarkovtracker-org/TarkovTracker/commit/b7498f7839ded9acea699a5ba1f1bb6522333c49))
* **tasks:** improve null safety and normalize locale keys ([2cccbeb](https://github.com/tarkovtracker-org/TarkovTracker/commit/2cccbeb6f7ff8a807d72a6ae199a15269f5ade73))
* improve popup management in LeafletMap and clean up TaskObjectiveItemGroup comments ([77bb9bc](https://github.com/tarkovtracker-org/TarkovTracker/commit/77bb9bc54b82f04789501b39278285074a6cd5be))
* **config:** improve redirect and robots.txt configuration ([7db92eb](https://github.com/tarkovtracker-org/TarkovTracker/commit/7db92ebbb448b810e6b83a383c9fe55ac620d634))
* improve task completion merge and objective type inference ([7452863](https://github.com/tarkovtracker-org/TarkovTracker/commit/745286391011a564d0d2c08b641e939ca138a7b0))
* improve TaskCard completed state visibility ([c643d46](https://github.com/tarkovtracker-org/TarkovTracker/commit/c643d46cd7a7aa98bf2811c20ce58e67beb94e96))
* improve team feature robustness and add RLS migration ([4f35ce3](https://github.com/tarkovtracker-org/TarkovTracker/commit/4f35ce3e67a9b76062e63dea084afb6feb145e38))
* improve test infrastructure ([2cd6c63](https://github.com/tarkovtracker-org/TarkovTracker/commit/2cd6c634ee9aafd31d9e0d61f55bfebe458a3d70))
* **maps:** improve tile layer cleanup and tooltip translations ([9bd2f20](https://github.com/tarkovtracker-org/TarkovTracker/commit/9bd2f2009c7e336e99193e16703b03a8a9d4424b))
* **supabase:** improve types and migration idempotency ([16e4e03](https://github.com/tarkovtracker-org/TarkovTracker/commit/16e4e036e1ebb8533508b29d717da98c26251bed))
* include Lightkeeper trader tasks in filters ([c566b8b](https://github.com/tarkovtracker-org/TarkovTracker/commit/c566b8bc3843ad77980fd7211baf82dc8461587b))
* **tasks:** isolate map stacking context from overlay drawer ([57db262](https://github.com/tarkovtracker-org/TarkovTracker/commit/57db26201ecdf450a5f7196ab1b51abd34ae0a50))
* **i18n:** keep external tool names in English for zh locale ([000e746](https://github.com/tarkovtracker-org/TarkovTracker/commit/000e74668b665cb3a4182785de8ba9dfa3e564e5))
* **ui:** keep release note order in dashboard changelog ([f32b35f](https://github.com/tarkovtracker-org/TarkovTracker/commit/f32b35fedefa6b977c9dd9041b42f756478ae434))
* **i18n:** localize task requirement and block/fail strings ([016d611](https://github.com/tarkovtracker-org/TarkovTracker/commit/016d611940b2f27399b5d21dc9b405eb6ecae594))
* **store:** log stale failed-flag cleanup context ([6edb6bb](https://github.com/tarkovtracker-org/TarkovTracker/commit/6edb6bbad1eb75139b8d9445f157c6245a379584))
* **tasks:** make Impact optionally respect active filters ([c63d979](https://github.com/tarkovtracker-org/TarkovTracker/commit/c63d979719d19bb635eef6ef5585e32c8d683341)), closes [#92](https://github.com/tarkovtracker-org/TarkovTracker/issues/92)
* **useTaskNotification:** make objectiveAction optional in handleAlternatives function ([eb4fb7f](https://github.com/tarkovtracker-org/TarkovTracker/commit/eb4fb7f4d683c0a8740136fe6a865887f9e7ce63))
* make task settings modal scrollable ([67979eb](https://github.com/tarkovtracker-org/TarkovTracker/commit/67979eb1803f1cb0537a82e97872697f492edb20))
* **oauth:** make user and scope properties optional in authorization details ([851b92c](https://github.com/tarkovtracker-org/TarkovTracker/commit/851b92c95fbb2c303cde6b8d6dc0a7c7c57c0b7f))
* merge overlay patches for id arrays ([67a75f3](https://github.com/tarkovtracker-org/TarkovTracker/commit/67a75f315430b38715c0c263cedffbdb05058862))
* normalize task objectives ([5669f2c](https://github.com/tarkovtracker-org/TarkovTracker/commit/5669f2ca7776ecc89bdc30b5793b67111b361ba4))
* Normalize team gateway paths for robustness and align team creation/join parameters to `join_code`. ([eefb43c](https://github.com/tarkovtracker-org/TarkovTracker/commit/eefb43cd478b27dd4481bcc879a397932e703c98))
* optimize ResizeObserver with debounce and error handling ([2a95ed5](https://github.com/tarkovtracker-org/TarkovTracker/commit/2a95ed57b190ecfd78a4270a17ca9d6a38ac4576))
* **deps:** patch @modelcontextprotocol/sdk cross-client data leak in MCP plugins ([eee9fbc](https://github.com/tarkovtracker-org/TarkovTracker/commit/eee9fbc83d97c865fd1f3a6e23d07e5c25b0453f))
* **deps:** patch axios DoS vulnerability (GHSA-43fc-jf86-j433) ([0f1ddf1](https://github.com/tarkovtracker-org/TarkovTracker/commit/0f1ddf11debfb0c45171c7acbffabadd0596e07e))
* **tasks:** preserve manual failure state during repair ([1305f4a](https://github.com/tarkovtracker-org/TarkovTracker/commit/1305f4ad0afd0534bed519a834b7765ca14c4079))
* **tasks:** preserve status backgrounds for global accent, fix es.json5 consistency ([80f8b4e](https://github.com/tarkovtracker-org/TarkovTracker/commit/80f8b4ee7a0cf1c66781d02e8ded0dd26f8b0125))
* **tasks:** preserve status borders for global accent ([2dae3ce](https://github.com/tarkovtracker-org/TarkovTracker/commit/2dae3ce2aef31e2cc32ab772a69090e212bd8251))
* **tasks:** prevent hidden teammate mutations under hide-all ([a9fb665](https://github.com/tarkovtracker-org/TarkovTracker/commit/a9fb66517fb4bc89781eb9253e8aa9f17eee08d3))
* **useInfiniteScroll:** prevent multiple queued nextTick/rAF chains during rapid scroll ([0145efc](https://github.com/tarkovtracker-org/TarkovTracker/commit/0145efcad7a24705ead02aab469ed649927a55b3))
* prevent nav drawer content from shrinking on short viewports ([87260ef](https://github.com/tarkovtracker-org/TarkovTracker/commit/87260efc37d87859c0b802bfafbd19f3299802a1))
* prevent race condition in debounce function by capturing local resolve/reject handlers ([4ca9a39](https://github.com/tarkovtracker-org/TarkovTracker/commit/4ca9a39f2eb8c9f3719f97c07326d4898fd3d58c))
* prevent task objective markers from rendering behind the map svg ([03a4990](https://github.com/tarkovtracker-org/TarkovTracker/commit/03a4990d2cfd37c7886b47d1bdc5f797a8e7c773))
* purge legacy user storage key ([ed64d15](https://github.com/tarkovtracker-org/TarkovTracker/commit/ed64d150fdd3546600ad1273fa5915740e8b447f))
* **tasks:** reactively update map when global tasks filter is toggled ([f7cd5e5](https://github.com/tarkovtracker-org/TarkovTracker/commit/f7cd5e58776e33ecf34401d8c54515567b2684d1))
* **hideout:** read calculated skill levels for requirement validation ([3b8c8ac](https://github.com/tarkovtracker-org/TarkovTracker/commit/3b8c8acc5699842e6ebde15f77bc382701a07d6e))
* reduce AppBar height from h-16 to h-11 ([45ada46](https://github.com/tarkovtracker-org/TarkovTracker/commit/45ada46d1875c66eba4d5094e65c0634add20fdf))
* **test:** reduce test duplication and improve descriptions ([4a6418c](https://github.com/tarkovtracker-org/TarkovTracker/commit/4a6418c77b577a535ae75ff569eb7448ad108418))
* **test:** refactor createMockUseNeededItems grouped items logic ([f832534](https://github.com/tarkovtracker-org/TarkovTracker/commit/f832534bbfadc84f522f3f3ba20b539938d46491))
* **oauth:** refactor Supabase client usage for improved session handling ([0ce5b30](https://github.com/tarkovtracker-org/TarkovTracker/commit/0ce5b3053ce2e6000a62f5c2c34be87d79dd0336))
* refine task list filtering and scroll behavior ([a47f086](https://github.com/tarkovtracker-org/TarkovTracker/commit/a47f0867e17febb4d4e207e436a7808e7e2f531e))
* **tasks:** refresh visible list immediately after task actions ([5d0e577](https://github.com/tarkovtracker-org/TarkovTracker/commit/5d0e577357f15c841a190f9479d3103825cc6e6e))
* remove delay between "jump to map" and map element being selected ([4fcf6f0](https://github.com/tarkovtracker-org/TarkovTracker/commit/4fcf6f037237b9b692b23e155873e24e742feee2))
* **nuxt:** remove prerendering for index page ([720fd04](https://github.com/tarkovtracker-org/TarkovTracker/commit/720fd0401fb43c5e00846bcd9165ea21124fa355))
* **oauth:** remove unused Supabase client reference in consent.vue ([989f7b6](https://github.com/tarkovtracker-org/TarkovTracker/commit/989f7b6bc9c6a3d610e62b8786f5b06d9a48fe44))
* remove Windows-specific path from .gitignore ([fbacfc3](https://github.com/tarkovtracker-org/TarkovTracker/commit/fbacfc36c6c033185b037a076e30774591d2d887))
* **config:** repair typecheck ([d69ca0b](https://github.com/tarkovtracker-org/TarkovTracker/commit/d69ca0b82c30fd78face69794fa01636b68d7944))
* **tasks:** replace async components with static imports in TaskInfo to fix tooltip ref error ([c9c4f0c](https://github.com/tarkovtracker-org/TarkovTracker/commit/c9c4f0cc69d8cbfd8bba12e532b49d5b1d34c153))
* replace wrangler with serve for Lighthouse CI preview server ([7d2961c](https://github.com/tarkovtracker-org/TarkovTracker/commit/7d2961c14ac00a5f498163fa4e336553c4f29537))
* reset legacy storage keys and drop dev host ([9052d2a](https://github.com/tarkovtracker-org/TarkovTracker/commit/9052d2a28ffb13b7446e713e9308e6b78eeacf76))
* **app:** resolve changelog typecheck errors ([49f7257](https://github.com/tarkovtracker-org/TarkovTracker/commit/49f7257401a0b82591bfb12bc2176987da6aa2ce))
* resolve CI failures in PR [#136](https://github.com/tarkovtracker-org/TarkovTracker/issues/136) ([1ced0ad](https://github.com/tarkovtracker-org/TarkovTracker/commit/1ced0ad1a777ea1d462472fe84069cc59d47ead2)), closes [#imports](https://github.com/tarkovtracker-org/TarkovTracker/issues/imports)
* resolve ESLint errors across codebase ([e96db47](https://github.com/tarkovtracker-org/TarkovTracker/commit/e96db47f702699cf1aacd1cc9d985c80350e17bf))
* **app:** resolve hideout status, objective count, and preferences sync bugs ([611df69](https://github.com/tarkovtracker-org/TarkovTracker/commit/611df695d315e42515d07ba78deb931b48f46311))
* resolve Jump to Map functionality for task objectives ([52d7ea5](https://github.com/tarkovtracker-org/TarkovTracker/commit/52d7ea53a45e602b7d260f5f59c47fcc2d78ab31))
* **app:** resolve preferences sync race condition and simplify metadata initialization ([129df5d](https://github.com/tarkovtracker-org/TarkovTracker/commit/129df5df9abc777e145ac5fabce1bd77c998a394))
* **settings:** resolve privacy mode infinite loading and add cooldown ([a775cc3](https://github.com/tarkovtracker-org/TarkovTracker/commit/a775cc3bcfac2a0d7141250e78622df5461ebb7c))
* resolve Ref unlock gating and migrate legacy task completions ([af3e707](https://github.com/tarkovtracker-org/TarkovTracker/commit/af3e707379081ca35cab00b989a9870e0146cf79))
* Resolve RLS recursion and broaden select policy for team memberships, and improve settings page robustness. ([ce66cfa](https://github.com/tarkovtracker-org/TarkovTracker/commit/ce66cfad32a53f78460e4bd98d663dec8dfa11f2))
* resolve strict type errors in progress completion handling ([9de7088](https://github.com/tarkovtracker-org/TarkovTracker/commit/9de70882d03b4f9b5361a7750e2a2aed0926d4c5))
* **app:** resolve timing, state, and correctness bugs across features ([28a543e](https://github.com/tarkovtracker-org/TarkovTracker/commit/28a543e625893b3447f633e95819951a0dc45c9d))
* **app:** resolve TypeScript errors in api-protection and logger ([456255c](https://github.com/tarkovtracker-org/TarkovTracker/commit/456255c71a699bee783b7c85efddb061005cac25))
* resolve z-index context issue where map overlaps nav drawer ([1ed8b88](https://github.com/tarkovtracker-org/TarkovTracker/commit/1ed8b88f8484720a0b2c65b63dcd0404a963e81d))
* **tasks:** respect manual fail flag in repair and normalization ([c145844](https://github.com/tarkovtracker-org/TarkovTracker/commit/c145844a17ddbf9ac6b4f38b7b2f284f6ed9e88a))
* restore objective item icon fallback ([6d04665](https://github.com/tarkovtracker-org/TarkovTracker/commit/6d04665db395365f62f606a52399a03f326c33fb))
* **app:** retry preference sync for multiple missing columns ([2af4dca](https://github.com/tarkovtracker-org/TarkovTracker/commit/2af4dca0645bd5cd58b8c493433e77cd8fd542a3))
* sanitize sensitive table errors in account deletion logs ([d205ceb](https://github.com/tarkovtracker-org/TarkovTracker/commit/d205cebcd75ff387d7bb3c8cbbe49fdc5480252b))
* simplify manual level editing tooltip and button logic ([66be923](https://github.com/tarkovtracker-org/TarkovTracker/commit/66be92325b055a8972b7c6e5935b314ab5375484))
* **i18n:** standardize task terminology and add Found in Raid translations ([6ffc27a](https://github.com/tarkovtracker-org/TarkovTracker/commit/6ffc27a32f21d9ad1165f41920edd14881e80272)), closes [#109](https://github.com/tarkovtracker-org/TarkovTracker/issues/109)
* streamline needed items visibility ([cfaacb5](https://github.com/tarkovtracker-org/TarkovTracker/commit/cfaacb546b81a3666b18bbbc4c31adee4f02acc0))
* **oauth:** streamline Supabase client usage in consent.vue ([e2ec606](https://github.com/tarkovtracker-org/TarkovTracker/commit/e2ec606b5a72521a530caf740b68a04979d1c2e5))
* **test:** strengthen assertions and reduce test fragility ([b5b7362](https://github.com/tarkovtracker-org/TarkovTracker/commit/b5b73629a487be77d91c2e1ffc7ce5a579dbd5b6))
* **settings:** support decimal skill input precision ([#160](https://github.com/tarkovtracker-org/TarkovTracker/issues/160)) ([17d7107](https://github.com/tarkovtracker-org/TarkovTracker/commit/17d710762a2af438ff3d7586e75cbdec11f7fae5)), closes [#159](https://github.com/tarkovtracker-org/TarkovTracker/issues/159)
* suppress false progress merge toast for self-origin sync ([aa7903d](https://github.com/tarkovtracker-org/TarkovTracker/commit/aa7903da98a8fdc529bde6715e3eeed514ba05aa))
* sync derived level to database when automatic level calculation is enabled ([9317e8b](https://github.com/tarkovtracker-org/TarkovTracker/commit/9317e8b275f07ab19efe9ca459475c0d04739c58))
* **maps:** sync Interchange bounds with tarkov.dev ([a5954e6](https://github.com/tarkovtracker-org/TarkovTracker/commit/a5954e63ccbcaf3c7c36c4fa4050ce5f965fab5f))
* Synchronize user team membership in `user_system` and client store when attempting to create or join a team. ([961877e](https://github.com/tarkovtracker-org/TarkovTracker/commit/961877ee5d5ec3a3374e8affc13d908c87e2b588))
* task badge count does not update according to task preferences. ([#132](https://github.com/tarkovtracker-org/TarkovTracker/issues/132)) ([a68c6a0](https://github.com/tarkovtracker-org/TarkovTracker/commit/a68c6a018894657a820bf9210860c0b247af0490))
* **tasks:** treat failed tasks as incomplete for impact scoring ([c4f374e](https://github.com/tarkovtracker-org/TarkovTracker/commit/c4f374ea4697120c038e4926bdd3f74dbdf26626))
* tune api-gateway rate limiting and CORS ([af83d3b](https://github.com/tarkovtracker-org/TarkovTracker/commit/af83d3bb252038335f6005d2d59c2608c315b9dc))
* **deps:** update @unhead/vue and @cloudflare/workers-types to latest versions ([3237809](https://github.com/tarkovtracker-org/TarkovTracker/commit/323780946ab6db5abab957cb8e58bab8e9931db2))
* update comments, formatting, and loading screen logic ([73fa6d0](https://github.com/tarkovtracker-org/TarkovTracker/commit/73fa6d0c0e3d77f9c5c379f76d52565bd1ee81f1))
* **config:** update migrations and database types for preferences and security ([db2dd3e](https://github.com/tarkovtracker-org/TarkovTracker/commit/db2dd3e354c17e3464c469e2c48e4596cdd4fede))
* **ui:** update nav drawer behavior ([4f4d705](https://github.com/tarkovtracker-org/TarkovTracker/commit/4f4d7056436041b3988b5b9a3defb2c8b2e8cbd2))
* **dependencies:** update package versions for @cloudflare/workers-types, @types/node, happy-dom, and supabase ([f24b017](https://github.com/tarkovtracker-org/TarkovTracker/commit/f24b01773084db30f729e52ab6518878eba5dda5))
* update transform type to allow null return in SupabaseSyncConfig ([31cab8b](https://github.com/tarkovtracker-org/TarkovTracker/commit/31cab8b763483298555d4ac9175bceec2e803b13))
* **tasks:** use direct parents instead of transitive predecessors for locked count ([05dc056](https://github.com/tarkovtracker-org/TarkovTracker/commit/05dc0566687b2970e032411b065d790572f68c06))
* use function-based $patch for reset to fully replace nested state ([ce4f8e2](https://github.com/tarkovtracker-org/TarkovTracker/commit/ce4f8e293289bee3e13516258576b8b3234fa6e3))
* use ResizeObserver to handle container resizing and fix centering during init ([352dfc7](https://github.com/tarkovtracker-org/TarkovTracker/commit/352dfc7410460cac42234130a394393775dcc591))
* use solid (default) variant for action buttons ([53613b9](https://github.com/tarkovtracker-org/TarkovTracker/commit/53613b9d917582d66d8dc512ea9249e925701fa6))
* use useRuntimeConfig for Supabase credentials in team/members API route ([4e52e5a](https://github.com/tarkovtracker-org/TarkovTracker/commit/4e52e5a420587e04d4a8767a0c5c93f374c121d4))
* **test:** verify prototype pollution throws with descriptive message ([d61f704](https://github.com/tarkovtracker-org/TarkovTracker/commit/d61f704092e307fa850dace235f9a164c60ad19b))


### Features

* add admin panel with cache management and audit logging ([30d1b10](https://github.com/tarkovtracker-org/TarkovTracker/commit/30d1b10008396185fe648b4be68bb12645b7948e))
* add api gateway and game-mode token prefixes ([9ec709b](https://github.com/tarkovtracker-org/TarkovTracker/commit/9ec709b1d4e438e30ef26562132e32ade3592cc9))
* add api subdomain routes ([ee2e51c](https://github.com/tarkovtracker-org/TarkovTracker/commit/ee2e51c6b4a80c936b01fec8f040bb1ec3902fc9))
* add BaseProgressBar component and user preferences migration ([dea10a0](https://github.com/tarkovtracker-org/TarkovTracker/commit/dea10a0ed2fceb092d5bf9b798ce4624da7fa903))
* **app:** add changelog feature and dismissable dashboard notice ([2565bd7](https://github.com/tarkovtracker-org/TarkovTracker/commit/2565bd71b0667ab83ce16bd5556025c7b4e23e2a))
* **i18n:** add Chinese translations and translation script ([b8f7c36](https://github.com/tarkovtracker-org/TarkovTracker/commit/b8f7c3678dcd5c0eb9d8e182961ebcb448b7528d))
* **ci:** add CI/CD automation, git hooks, and dev tooling ([#142](https://github.com/tarkovtracker-org/TarkovTracker/issues/142)) ([0fe81d9](https://github.com/tarkovtracker-org/TarkovTracker/commit/0fe81d9fdae9dc3a286bdff4522d2ecb6d43b625))
* add Claude plugin with Tarkov MCP servers ([12e1f94](https://github.com/tarkovtracker-org/TarkovTracker/commit/12e1f94500ba78522234c7c6a2e199be04f69051))
* **traders:** add click-to-filter navigation and fix display issues ([ff6df3a](https://github.com/tarkovtracker-org/TarkovTracker/commit/ff6df3af9b58ba9e4c906d8f6d574d8a572f7390))
* add Cloudflare Worker for team API gateway ([7a9befe](https://github.com/tarkovtracker-org/TarkovTracker/commit/7a9befee6a154ae0a7a8137f677a245d1ac30cac))
* **tests:** add comprehensive unit tests for various components and utilities ([14d92ca](https://github.com/tarkovtracker-org/TarkovTracker/commit/14d92ca6525755da975024016230b5c3a0675d83))
* **hideout:** add configurable prerequisite filters ([138d4d7](https://github.com/tarkovtracker-org/TarkovTracker/commit/138d4d75bea571f5374ca873f43e7e90fe51b918))
* **tasks:** add context menu to task dependency links and improve deep linking ([985676a](https://github.com/tarkovtracker-org/TarkovTracker/commit/985676aca8fa8076f4480d563b9d170a8f9e6ee7))
* **neededitems:** add context menu with wiki and tarkov.dev links ([9cfb42d](https://github.com/tarkovtracker-org/TarkovTracker/commit/9cfb42d0e4d78180ce7c49ecd52e1d477c84584a))
* add Deno stubs and configuration for Supabase functions ([d1075c9](https://github.com/tarkovtracker-org/TarkovTracker/commit/d1075c9f76aa0f8d0779b75f0df346bb7b425ed6))
* add error logging to error page component ([8121a12](https://github.com/tarkovtracker-org/TarkovTracker/commit/8121a12d62177eedb310300f8adf8cc0f5569f9f))
* add experimental payload extraction configuration to nuxt.config.ts ([73670ff](https://github.com/tarkovtracker-org/TarkovTracker/commit/73670ffeedbfe141567bee2ae21626cff61c97c6))
* **team:** add exponential backoff retry for teammate stores ([c4f803d](https://github.com/tarkovtracker-org/TarkovTracker/commit/c4f803d543dd481523b3856de074d326558bd0d9))
* **api-docs:** add favicon link to API documentation ([3ce7bef](https://github.com/tarkovtracker-org/TarkovTracker/commit/3ce7bef1df17a014587357bd3d3796a5090b666f))
* add formatting and linting guideline to repository instructions ([f91f33c](https://github.com/tarkovtracker-org/TarkovTracker/commit/f91f33c9b8d578182534546069532680897df1af))
* add game mode separation for teams (PvP/PvE) ([e1624cd](https://github.com/tarkovtracker-org/TarkovTracker/commit/e1624cd442cf9c9c5c2c8b8fe8894a85d5fd8ab2))
* add gateway fallback support to team API composable ([5054822](https://github.com/tarkovtracker-org/TarkovTracker/commit/50548225b421d25ac1f3e6399134a4351e6f6716))
* **changelog:** add GitHub API rate-limit tracking and localStorage caching ([9b6d2b6](https://github.com/tarkovtracker-org/TarkovTracker/commit/9b6d2b6f619c97fce13e3630a915580307b133c9))
* add GitHub as an OAuth provider and update related components ([99559f3](https://github.com/tarkovtracker-org/TarkovTracker/commit/99559f35b77bab678569bfd9734de43300d096a8))
* **tasks:** add global accent variant to task cards ([2c579f8](https://github.com/tarkovtracker-org/TarkovTracker/commit/2c579f84616b60e24d74b2a2daa55b2fd97e7dd8))
* add Google OAuth as login provider ([3a29bd2](https://github.com/tarkovtracker-org/TarkovTracker/commit/3a29bd2a5b542ad7e9a484ad9fdb47d44240a4cc))
* add graphql configuration files to .gitignore ([44d411f](https://github.com/tarkovtracker-org/TarkovTracker/commit/44d411fbc6479073719bff41dfc63cc37dd89e9f))
* **maps:** add grid-based PMC spawn clustering with zoom-dependent rendering ([91b84e0](https://github.com/tarkovtracker-org/TarkovTracker/commit/91b84e09be38cd265ada3149dcc599a9a3febd81)), closes [#84](https://github.com/tarkovtracker-org/TarkovTracker/issues/84)
* add hideout items dashboard card, gateway resilience, and needed-items route sync ([ef51ab5](https://github.com/tarkovtracker-org/TarkovTracker/commit/ef51ab5f6bf61321c07b0a5800091d2bb5ede38e))
* **i18n:** add hideout prereq confirmation strings ([c79613a](https://github.com/tarkovtracker-org/TarkovTracker/commit/c79613a6ddd906d4f91698d3223b246314232d04))
* **app:** add hideout prereq preferences and preference migration ([84e96b4](https://github.com/tarkovtracker-org/TarkovTracker/commit/84e96b412f434279b425635ca17eda51a732b730))
* Add hideout station anchor links and refactor requirement count management. ([5c183da](https://github.com/tarkovtracker-org/TarkovTracker/commit/5c183dae56fd525225a72baf4548b6bc61873be7))
* add holiday effects with toggle ([84ad13f](https://github.com/tarkovtracker-org/TarkovTracker/commit/84ad13ffba93bca2216b6fbba58184e6ec798498))
* add interactive Leaflet map system with floor switching ([32ff63e](https://github.com/tarkovtracker-org/TarkovTracker/commit/32ff63ee1b031e4ea89d6f5fea9fd12accc5f8b7))
* **neededitems:** add item grouping, FIR filtering, and improved card layouts ([4c5847e](https://github.com/tarkovtracker-org/TarkovTracker/commit/4c5847e12d258f213c7275791d9938acaabc496c))
* **api:** add items-lite endpoint and refactor data fetching ([57bfb1c](https://github.com/tarkovtracker-org/TarkovTracker/commit/57bfb1cbc145f1471e42124f318f708f9d107409))
* **maps:** add map color and pan-speed preferences ([0bacf37](https://github.com/tarkovtracker-org/TarkovTracker/commit/0bacf37d3615b7663802d754349ca2284f2a8cfb))
* add missing user_preferences columns for client sync ([cae0662](https://github.com/tarkovtracker-org/TarkovTracker/commit/cae0662531a193a1196c2dca9c11ad785a443970))
* **app:** add module completion and currency exclusion to dashboard hideout stats ([9a18731](https://github.com/tarkovtracker-org/TarkovTracker/commit/9a18731d23fc1ebe25bfddfc6b075cc1cc154b16))
* **app:** add offline mode support and UI improvements ([8c1bc66](https://github.com/tarkovtracker-org/TarkovTracker/commit/8c1bc66293ba45643f7f9a218247f7670a1f780d))
* **api-gateway:** add OpenAPI documentation and update routing for API endpoints ([99e627f](https://github.com/tarkovtracker-org/TarkovTracker/commit/99e627f8725a889a1ac0ba7b649eb802d09d52c5))
* add OpenAPI validation script and update OpenAPI spec ([3356206](https://github.com/tarkovtracker-org/TarkovTracker/commit/33562065e90ec50b1cda8850f3914998c92ad101))
* add performance instrumentation for debugging and profiling ([531b32f](https://github.com/tarkovtracker-org/TarkovTracker/commit/531b32f2bfc7ac8e6488b8aed1caa4dde241117c))
* **tasks:** add QuestObjectivesSkeleton loading placeholder component ([615eaf9](https://github.com/tarkovtracker-org/TarkovTracker/commit/615eaf9caf54f9412f2d2b5ece06ae788b7b2500))
* add real-time task sync for team members ([a76dfa6](https://github.com/tarkovtracker-org/TarkovTracker/commit/a76dfa651dc2ce39e2cee9b3e3dddaef02320c00))
* add SEO improvements, loading screen, and automatic level calculation ([851ad91](https://github.com/tarkovtracker-org/TarkovTracker/commit/851ad91353c816f1bcf604ffcc31028e6b7600ce))
* **cache:** add server-side cache purge synchronization ([7087f3b](https://github.com/tarkovtracker-org/TarkovTracker/commit/7087f3bf1708a182c5afd4357436297d0b0317b9))
* **ui:** add task pin tooltip and refine discord hover color ([959b572](https://github.com/tarkovtracker-org/TarkovTracker/commit/959b57293f7c5f9542e795f623795309745c3594))
* **tasks:** add task settings modal with filter and appearance options ([f98b47f](https://github.com/tarkovtracker-org/TarkovTracker/commit/f98b47fd1800917eff065b4a2f16e8a2794f267e))
* add task sorting controls ([4ea1519](https://github.com/tarkovtracker-org/TarkovTracker/commit/4ea15190a36e854c071b8a5716450c171ce6c834))
* add team API response type definitions ([775112d](https://github.com/tarkovtracker-org/TarkovTracker/commit/775112dad2ebea43a9eec0298863ebe5e113edae))
* add team progress endpoint and do rate limiter ([3f05817](https://github.com/tarkovtracker-org/TarkovTracker/commit/3f058172c521778bbe8b5951e08123a84c70bedb))
* **i18n:** add teammate retry toast and needed-items SEO locale keys ([f5ab736](https://github.com/tarkovtracker-org/TarkovTracker/commit/f5ab736ed198800f04ee445639743b9fbe2dbd83))
* **maps:** add tile fallback URLs with automatic error recovery ([dc48d6d](https://github.com/tarkovtracker-org/TarkovTracker/commit/dc48d6d44670b6e50f03ef7a9ed7a5d42b8bc092))
* add tooltip to TaskFilterBar settings button and update test stubs ([d155db8](https://github.com/tarkovtracker-org/TarkovTracker/commit/d155db80a0a7488f1328f92af2b797a8eefb7329))
* **tasks:** add tooltips for minimum player level and quest requirements ([af21657](https://github.com/tarkovtracker-org/TarkovTracker/commit/af2165770c5670fdcb67379e6a84227d1e7d8c34))
* Add trader display order and enhance task objective handling ([00c2b57](https://github.com/tarkovtracker-org/TarkovTracker/commit/00c2b5716d45eec481c8294063d4628070747a22))
* **tasks:** add trader quest dependency graph view ([a549c4e](https://github.com/tarkovtracker-org/TarkovTracker/commit/a549c4e3c3e58e752079e8b915a4324c7d567fed))
* Add Traders page, enhance needed item tracking logic, and implement UI/UX improvements with new components and image optimizations. ([72fa574](https://github.com/tarkovtracker-org/TarkovTracker/commit/72fa5749e72a99b83b97bf41dc3425f7d23acae5))
* add type guard for ID-keyed arrays and improve ID handling in merge functions ([8ac0ee7](https://github.com/tarkovtracker-org/TarkovTracker/commit/8ac0ee75f94555ef42f5de4e236ead2b0cc1f391))
* Add UI and logic for managing team display names, including new localization strings. ([4151579](https://github.com/tarkovtracker-org/TarkovTracker/commit/4151579b79afc36aac95b9769cae887b4f5e66ff))
* add user preferences for task filters and UI improvements ([b35096b](https://github.com/tarkovtracker-org/TarkovTracker/commit/b35096bf6c5f82e45bfeb693eebd226f435f660e))
* add utilities, types, and color linting scripts ([20309a5](https://github.com/tarkovtracker-org/TarkovTracker/commit/20309a52a29e733d29dd14756a5ec9ef28063e6b))
* add XP/skill calculation, prestige system, and major UI improvements ([37acbf8](https://github.com/tarkovtracker-org/TarkovTracker/commit/37acbf81113860a31a503b0ff2f99a94d63e4ce1))
* **maps:** add zoom speed control ([358ecf7](https://github.com/tarkovtracker-org/TarkovTracker/commit/358ecf7aba3bbc2d4a1ad2e321f72499e900a12f))
* **i18n:** added Chinese translations with English locale ([4dccca7](https://github.com/tarkovtracker-org/TarkovTracker/commit/4dccca7b5bc5a3f4ad369a071b119d3cde6100a2))
* **tasks:** Added task keys full name and hover copy name button ([#131](https://github.com/tarkovtracker-org/TarkovTracker/issues/131)) ([48780c7](https://github.com/tarkovtracker-org/TarkovTracker/commit/48780c7846e0ffca3882d8066704092ca7ef527f))
* allow 'password' as an alias for 'join_code' in team creation and joining functions. ([9e7cd01](https://github.com/tarkovtracker-org/TarkovTracker/commit/9e7cd01f1d8184013a3c4c4232f32ba967c42b99))
* compact skills settings and polish UI ([6f150ba](https://github.com/tarkovtracker-org/TarkovTracker/commit/6f150ba6baeca854de63e0dba70a136548e40cf2))
* **dashboard:** consolidate update notice and compact filter indicator ([7641893](https://github.com/tarkovtracker-org/TarkovTracker/commit/7641893e4b9873b3157cdefacf8843f223b29ccc))
* disable prestige in PVE mode and enhance overlay task injection ([cbd5cd9](https://github.com/tarkovtracker-org/TarkovTracker/commit/cbd5cd921eed32b0592c0f5f9208bc039bcebc0e))
* disable smooth scroll for window-scrolled pages ([503fd64](https://github.com/tarkovtracker-org/TarkovTracker/commit/503fd64d2d2e2b3ee9ef407efd6595c137f7c5e1))
* **tasks:** dock settings drawer beside map on large screens ([f47bb60](https://github.com/tarkovtracker-org/TarkovTracker/commit/f47bb600875e3fce5bcc61f39d1fb6fae54d43e4))
* enable API tokens feature and configure gateway ([655da56](https://github.com/tarkovtracker-org/TarkovTracker/commit/655da56bdc0c33fac9d007a56fc7520fb55270e5))
* Enable real-time team data synchronization and add a new team creation UI update error message. ([939975d](https://github.com/tarkovtracker-org/TarkovTracker/commit/939975d0acdd9e5a4821ee7a9daed0c3285813f1))
* enable smart placement for api-gateway worker ([07913ed](https://github.com/tarkovtracker-org/TarkovTracker/commit/07913ed04a2dc7768eafa8ce07ab8301b6b666d7))
* **hideout:** enforce prereq cascades with confirmation ([beb41d4](https://github.com/tarkovtracker-org/TarkovTracker/commit/beb41d409982fbcd115b723bbfc4575be27a7869))
* **utils:** enhance async, objectPath, and mapCoordinates utilities ([1b4e633](https://github.com/tarkovtracker-org/TarkovTracker/commit/1b4e633a7b053c00d72591e21ad696236b71d331))
* **ui:** enhance dashboard cards ([51aac13](https://github.com/tarkovtracker-org/TarkovTracker/commit/51aac138f1b52e5828d8d4398777d788160dd7ac))
* enhance data migration functionality with improved state management and API token handling ([336a2f8](https://github.com/tarkovtracker-org/TarkovTracker/commit/336a2f81db6cd886538284af05c1ee31cb19302e))
* Enhance hideout item requirements with Found in Raid status and attributes ([649e729](https://github.com/tarkovtracker-org/TarkovTracker/commit/649e72909a996f75eaf14d1835e5099cda8bdc92))
* enhance localization and user preferences ([940784e](https://github.com/tarkovtracker-org/TarkovTracker/commit/940784ea1eee2924882a93d66c22822a500c81ca))
* **maps:** enhance map composables and add sync script ([ed7b8b0](https://github.com/tarkovtracker-org/TarkovTracker/commit/ed7b8b0cc33a0093affd405c86444c70aea5b8d1))
* enhance modal layout with improved scrolling and responsive design ([7604791](https://github.com/tarkovtracker-org/TarkovTracker/commit/760479101c6e897d1a299480256d5b8f8f3c63ab))
* **ui:** enhance needed items filtering and display ([f324319](https://github.com/tarkovtracker-org/TarkovTracker/commit/f324319dc2e5359761e05d639f119b414da1fc22))
* enhance needed items kappa filtering and indicators ([9ee5d6f](https://github.com/tarkovtracker-org/TarkovTracker/commit/9ee5d6f1004a58d5487214a57d452c9e08cd9131))
* **ui:** enhance needed items view ([38a187e](https://github.com/tarkovtracker-org/TarkovTracker/commit/38a187e632f4fed54f85f532d4c1a69168a17e64))
* enhance NeededItemsFilterBar with search focus handling and filter bar interactions ([a16ebbf](https://github.com/tarkovtracker-org/TarkovTracker/commit/a16ebbfecc9d05a1e95f01d3354bf8fbf19543ff))
* enhance objective type inference in overlay utility ([ae8fcbf](https://github.com/tarkovtracker-org/TarkovTracker/commit/ae8fcbf166703bf1265f16edc2ca1d6c13bc9776))
* **sync:** enhance Supabase sync with error handling and fallback logic ([e7f080d](https://github.com/tarkovtracker-org/TarkovTracker/commit/e7f080d8ff66c87fea2d6183ffa8c213ddbb8a95))
* enhance task and tooltip interactions with pinned tasks ([92a43f7](https://github.com/tarkovtracker-org/TarkovTracker/commit/92a43f787736ec4a11d7bf01e8c75802d581ea0d))
* **progress:** enhance task completion handling and update OpenAPI spec ([602fbdc](https://github.com/tarkovtracker-org/TarkovTracker/commit/602fbdced7b1c49a78dae26f45322f60ca77b3fb))
* **tasks:** enhance task completion logic and add tests for alternative task handling ([b930e58](https://github.com/tarkovtracker-org/TarkovTracker/commit/b930e5889211847b2ab05b77f1de114f812fca9b))
* enhance task filtering and UI components with improved imports and localization ([20c8c30](https://github.com/tarkovtracker-org/TarkovTracker/commit/20c8c301b9464aa8eb50ac425b1a079f0fd5f7ba))
* enhance TaskCardHeader with dynamic linking and improved tooltips ([381d52e](https://github.com/tarkovtracker-org/TarkovTracker/commit/381d52eba524ea92be2145fd4e0109040155dfa2))
* Enhance team collaboration features and improve code quality ([19f1c0e](https://github.com/tarkovtracker-org/TarkovTracker/commit/19f1c0e5367a6aa98f96b6e28b11e9cf5cc142fe))
* Enhance team management with join code and owner_id support, and synchronize user's team status in `user_system`. ([43949f0](https://github.com/tarkovtracker-org/TarkovTracker/commit/43949f06c9477d88b896c075c4af90846875231e))
* Enhance team member card with owner badge and improve team invite link management with show/hide and copy functionality. ([2e0ddfc](https://github.com/tarkovtracker-org/TarkovTracker/commit/2e0ddfc6f25288865c1bd56be74be44fa7a02061))
* **team:** enhance team store and options ([5779143](https://github.com/tarkovtracker-org/TarkovTracker/commit/57791431dd0f85572aac8bafcb53efb6489d044e))
* enhance tooltip functionality and internationalization support ([9cb587d](https://github.com/tarkovtracker-org/TarkovTracker/commit/9cb587dae30f072d15a436776f5a9649b33f65bb))
* enhance UI components and improve localization ([4a97e24](https://github.com/tarkovtracker-org/TarkovTracker/commit/4a97e24d2ee8a364dc32ef1d3985a2d17691f31f))
* enhance UI components with extract badge styles and improve item interaction text ([1e55312](https://github.com/tarkovtracker-org/TarkovTracker/commit/1e553120f7538c3a7196e1f464ad4a76aae6260d))
* enhance UI components with improved styling and highlight features for better user experience ([a1592d9](https://github.com/tarkovtracker-org/TarkovTracker/commit/a1592d9e55da8257de21383f55dd0d82fb2b889d))
* enhance UI configuration and improve TaskCard visibility; add sorting options in needed items ([ce4af90](https://github.com/tarkovtracker-org/TarkovTracker/commit/ce4af90f59259335964f9101281a7555d9ea1b22))
* enhance useInfiniteScroll with improved stickToBottom functionality and auto-load cycle management ([f38bda4](https://github.com/tarkovtracker-org/TarkovTracker/commit/f38bda46f030160fe3a2951da4ad3794cf5ff925))
* enhance user display name handling and update API routes to v2 ([992b27e](https://github.com/tarkovtracker-org/TarkovTracker/commit/992b27e754536ccb06a695ec2b6b30c581caf555))
* **i18n:** expand localizations for new features and improve consistency ([a334364](https://github.com/tarkovtracker-org/TarkovTracker/commit/a3343640c736e01d3eb0437c0e20534fd37ccd38))
* expand needed items filters and craft indicators ([86155ac](https://github.com/tarkovtracker-org/TarkovTracker/commit/86155ac6f0e828dcfd48801df80063cd565f66c9))
* expand task metadata pipeline and progress repair ([0262f87](https://github.com/tarkovtracker-org/TarkovTracker/commit/0262f870e004217e5a404252fe321006748ad4c1))
* filter tasks by edition ([e7e9c6a](https://github.com/tarkovtracker-org/TarkovTracker/commit/e7e9c6a1c143a9f40a3d0b9e53b5e155b570b34d))
* fix various minor layout issues, improve task/ objective highlight when jumping to task from map, link find objective on map to find and hand over objective in the task card ([df7e296](https://github.com/tarkovtracker-org/TarkovTracker/commit/df7e29659270115f42326aa8a430527fa744068e))
* **tasks:** group global tasks in map view section ([076951a](https://github.com/tarkovtracker-org/TarkovTracker/commit/076951a811065d1377c745a482d17830dd54f813))
* **api:** harden cache and protection config ([411d6ff](https://github.com/tarkovtracker-org/TarkovTracker/commit/411d6ff67994390731f784fc944ff21c1a26e13a))
* harden map layer reload cancellation and sync pending updates ([4e9ee53](https://github.com/tarkovtracker-org/TarkovTracker/commit/4e9ee53b025ef26009a5831fffabe60fe6a01c01))
* **tasks:** hide map-complete tasks and add visibility toggle ([#116](https://github.com/tarkovtracker-org/TarkovTracker/issues/116)) ([c40b1ee](https://github.com/tarkovtracker-org/TarkovTracker/commit/c40b1ee2d2548c1984ff306bfdb22f9929f8d468))
* Implement a centralized logging utility and add a codebase review document. ([f042ccb](https://github.com/tarkovtracker-org/TarkovTracker/commit/f042ccb307526ec04e6acf81792f644adbffd014))
* **api:** implement API task update handling and metadata tracking ([311f25a](https://github.com/tarkovtracker-org/TarkovTracker/commit/311f25ad9f2d9e99d0453e12bd2e61742184bdbd))
* Implement API token management and refine team RLS policies ([619c42c](https://github.com/tarkovtracker-org/TarkovTracker/commit/619c42c66c8bac524f873650802e3f0db0b1cb0e))
* implement comprehensive GitHub workflow system ([61ed8b1](https://github.com/tarkovtracker-org/TarkovTracker/commit/61ed8b10904dca0c2898db82d8737dce2689e7d0))
* implement critical cache check to skip loading screen ([79161da](https://github.com/tarkovtracker-org/TarkovTracker/commit/79161da25392c66533293675908e1549cc05720d))
* implement item distribution logic and enhance UI components for better user experience ([0a9df8c](https://github.com/tarkovtracker-org/TarkovTracker/commit/0a9df8c7db7e79b70b0dd630163dcb1a7f27583b))
* Implement multi-layer caching for Tarkov API data using IndexedDB ([f0e3ca7](https://github.com/tarkovtracker-org/TarkovTracker/commit/f0e3ca7af6e22cc1b4b585126c7dcb294e068162))
* **tasks:** implement notification auto-close and close button functionality ([a3840b4](https://github.com/tarkovtracker-org/TarkovTracker/commit/a3840b4c68541850995227ad7c58f498309cffe9))
* implement prototype pollution prevention in objectPath utility ([af647ab](https://github.com/tarkovtracker-org/TarkovTracker/commit/af647ab68f9550af1109113044d2632b21a08da1))
* implement skill level input and validation in useSkillCalculation ([239736f](https://github.com/tarkovtracker-org/TarkovTracker/commit/239736f811aec119e3c01f7651a0c6edff66f29e))
* Implement Supabase Edge Functions, new UI components, and refactor data fetching and page structure. ([e400b2c](https://github.com/tarkovtracker-org/TarkovTracker/commit/e400b2ce10b038cceb26b01d9a23e90f54879962))
* Implement Supabase-backed user preferences and enhance state synchronization logic ([84e8864](https://github.com/tarkovtracker-org/TarkovTracker/commit/84e88644d0a677ad2602603f952c02a11b27ee91))
* Implement team invite acceptance and member kicking, add skill tracking, and optimize Supabase RLS policies and indexing. ([2425fb9](https://github.com/tarkovtracker-org/TarkovTracker/commit/2425fb9b82560d769d71ec55b3fbdde7845781a6))
* improve account deletion and update edge functions ([ededf67](https://github.com/tarkovtracker-org/TarkovTracker/commit/ededf672d3745a389dae4edef61753aff53f02da))
* **app:** improve changelog feed ([af68632](https://github.com/tarkovtracker-org/TarkovTracker/commit/af68632282b58cd7fd6ab089f71a7c73e4d5c4a1))
* **ui:** improve component accessibility, type safety, and UX ([0e7d205](https://github.com/tarkovtracker-org/TarkovTracker/commit/0e7d20506a44c99b664990a3525d9d1eaddf41f1))
* **ui:** improve dashboard components ([6f092de](https://github.com/tarkovtracker-org/TarkovTracker/commit/6f092ded16b8524933e5832ddc67fcf7e5cd6054))
* **hideout:** improve filtering and add prereq modal composable ([c4bda84](https://github.com/tarkovtracker-org/TarkovTracker/commit/c4bda84a95860e8adf177ceed36bc9df2c5bc168))
* improve HideoutCard UI by removing unnecessary elements and enhancing styles ([5543cd9](https://github.com/tarkovtracker-org/TarkovTracker/commit/5543cd97eee03d777855c826914408ad60e70a5b))
* **app:** improve map floor logic, fix race conditions, and localize settings ([9cb0ff3](https://github.com/tarkovtracker-org/TarkovTracker/commit/9cb0ff35c0ea9a11353b8d2a2a1d179b0d4cf8aa))
* improve mobile responsiveness for app bar and navigation drawer ([e35de59](https://github.com/tarkovtracker-org/TarkovTracker/commit/e35de592d0496c723525133cad0d803ad8fea9c1))
* **api:** improve server caching and API protection ([eb6cb1f](https://github.com/tarkovtracker-org/TarkovTracker/commit/eb6cb1f777d3aebb26cdc8d0b28d9be1c286bbb5))
* improve task card UI and objective grouping logic ([4288d70](https://github.com/tarkovtracker-org/TarkovTracker/commit/4288d70d32e4e15c022941ba035197da7a6a57f0))
* improve task objective counts and accessibility ([3db964f](https://github.com/tarkovtracker-org/TarkovTracker/commit/3db964f35e7f8447476e473e5bacf4eb9f3590b7))
* **neededitems:** improve type safety and add team item filtering ([5da019b](https://github.com/tarkovtracker-org/TarkovTracker/commit/5da019b029501d3c329c5d164e6eed6e61da7fe7))
* improve UI components and task display ([bfe5a68](https://github.com/tarkovtracker-org/TarkovTracker/commit/bfe5a6858b1b65f0d2da1d8eb6c9fca478ac5f38))
* initialize Nuxt project with essential files and configurations ([5f33e78](https://github.com/tarkovtracker-org/TarkovTracker/commit/5f33e78f0853cb244d0abf526624da456d39c2fd))
* **oauth:** integrate Supabase for OAuth handling and remove legacy API endpoints ([ec42bfc](https://github.com/tarkovtracker-org/TarkovTracker/commit/ec42bfc5d30ead678172c67bce7f30fbbcfb6b7f))
* introduce ObjectiveRequiredEquipment component and enhance UI with updated color themes ([ca446bd](https://github.com/tarkovtracker-org/TarkovTracker/commit/ca446bd51d2b63e6d930a85df4471cd19be4dfee))
* **app:** localize loading screen, add global tasks section, and clean up stale locale keys ([6bc1975](https://github.com/tarkovtracker-org/TarkovTracker/commit/6bc197561158a94a186a5ade070d63570a1c62cf))
* localize reset confirmations ([fb4f62b](https://github.com/tarkovtracker-org/TarkovTracker/commit/fb4f62b6900e15b3cb03ddf73b354fe8830e6d40))
* make game mode switching asynchronous and refresh all data ([87cde9d](https://github.com/tarkovtracker-org/TarkovTracker/commit/87cde9dbbd8151c546f03d73d80bd8eb42a47e22))
* map view tooltip enhancements ([4e08977](https://github.com/tarkovtracker-org/TarkovTracker/commit/4e089773fef68832c13253183391c4d7e14e36a6))
* mask sensitive account data by default in settings ([566f3f8](https://github.com/tarkovtracker-org/TarkovTracker/commit/566f3f8e48839d0c7a7dbe8f425d0bff45352430))
* **team:** modernize team page UI and fix team data bugs ([6f2c557](https://github.com/tarkovtracker-org/TarkovTracker/commit/6f2c557bacec0031c6220cfaacc168e9a9071694))
* **maps:** move reset view button into native Leaflet zoom control ([7d2e1e0](https://github.com/tarkovtracker-org/TarkovTracker/commit/7d2e1e00fed414d34bf9f9ec37d83c722315103c))
* Normalize team gateway paths to accept trailing slashes and update documentation. ([612f24d](https://github.com/tarkovtracker-org/TarkovTracker/commit/612f24d46ab5051dfb4f511fb604e05472325b6d))
* **ui:** polish components and improve accessibility ([ed7e0c6](https://github.com/tarkovtracker-org/TarkovTracker/commit/ed7e0c688c5af605c68c20e57e34037fb7372f81))
* **settings:** polish settings cards ([b692dba](https://github.com/tarkovtracker-org/TarkovTracker/commit/b692dba498f6c1912e729a44da94e37a02c0c3ec))
* **ui:** polish shell components and drawer layouts ([6568e9d](https://github.com/tarkovtracker-org/TarkovTracker/commit/6568e9d185e5f3f501d8385feabce9784564a013))
* reduce Supabase egress usage ([06ef088](https://github.com/tarkovtracker-org/TarkovTracker/commit/06ef0887afa04d032863d3c07624fe2dfa3176c3))
* Refactor API caching with `useEdgeCache`, introduce `GameItem` component, and enhance team management. ([2e9e804](https://github.com/tarkovtracker-org/TarkovTracker/commit/2e9e8040e50919ffcc1ab138c9ae2aaf2cffd17b))
* refactor NeededItemsFilterBar layout for improved filter and view controls ([eb1d66f](https://github.com/tarkovtracker-org/TarkovTracker/commit/eb1d66f7b3b29d491850bcce03e5202901e4d453))
* **tasks:** refactor task page and extract composables ([e9368a8](https://github.com/tarkovtracker-org/TarkovTracker/commit/e9368a88adc178fc2e6d6f05ca2bd9ef7dde63ee))
* **shell:** refine app shell interactions ([3af8069](https://github.com/tarkovtracker-org/TarkovTracker/commit/3af8069342a2a319f9f2eae548a95bd2cf39ff9a))
* **app:** refine auth flow ([961004e](https://github.com/tarkovtracker-org/TarkovTracker/commit/961004e3ff00afc49f2d026e844ef76be96829f0))
* refine credits page ([88d9660](https://github.com/tarkovtracker-org/TarkovTracker/commit/88d9660dbaf288b4c95d34238f6cf5f2ac724e7c))
* **tasks:** refine filters and cards ([1392b16](https://github.com/tarkovtracker-org/TarkovTracker/commit/1392b160cb6d8b654d59c53085a707a55d017645))
* **ui:** refresh tracker feature surfaces ([b997ca0](https://github.com/tarkovtracker-org/TarkovTracker/commit/b997ca0754c77c14e5164c9eebf41a5ef5b2a017))
* remove api gateway kv usage ([a9838dd](https://github.com/tarkovtracker-org/TarkovTracker/commit/a9838dd6d34e52ba1f8b81031d88fd3b767d619b))
* **map:** shift+scroll zoom, ctrl+scroll floor cycling ([#49](https://github.com/tarkovtracker-org/TarkovTracker/issues/49)) ([49f94dc](https://github.com/tarkovtracker-org/TarkovTracker/commit/49f94dc2cd6581999a8377a4b2067c1d2124a5c4))
* **map:** show extract names on map markers ([#110](https://github.com/tarkovtracker-org/TarkovTracker/issues/110)) ([719672d](https://github.com/tarkovtracker-org/TarkovTracker/commit/719672d89a52f7c29e02fd1a2ff14f7e9de16dd4))
* show global tasks in map view ([#113](https://github.com/tarkovtracker-org/TarkovTracker/issues/113)) ([b72c039](https://github.com/tarkovtracker-org/TarkovTracker/commit/b72c03942c0dcd0dc2b1399837df4f5201645586))
* **tasks:** show requirement statuses and blocked reasons on task cards ([3656c94](https://github.com/tarkovtracker-org/TarkovTracker/commit/3656c94bf49545aabe7223ea395ac27a9326f2b9))
* simplify hover effects and improve cursor styles for single-item cards ([4f8c586](https://github.com/tarkovtracker-org/TarkovTracker/commit/4f8c58684b47138a81fc924e57a3b0dd72576754))
* surface needed-by and optimize task lookups ([3a3a8ba](https://github.com/tarkovtracker-org/TarkovTracker/commit/3a3a8ba5339e2db38d9017b47bcc0eaa7bdddfe1))
* **i18n:** sync German translations with English locale ([a27b6e5](https://github.com/tarkovtracker-org/TarkovTracker/commit/a27b6e56d998b7344f2c96f3f692334ca4cf976c))
* **ui:** tighten task traders and needed-items scrolling ([1b6988f](https://github.com/tarkovtracker-org/TarkovTracker/commit/1b6988f4b280a0474cd49dc2d7fdc3c1803725dd))
* **tasks:** track manual vs automatic task failures ([076c797](https://github.com/tarkovtracker-org/TarkovTracker/commit/076c797f39e766ce177e7515e1729a1b68d470a8))
* UI improvements and component refactoring ([0d47d3e](https://github.com/tarkovtracker-org/TarkovTracker/commit/0d47d3ec322b4528f960a65cbdb703d57570bf30))
* update AppFooter and NavDrawer styles for improved UI ([406968b](https://github.com/tarkovtracker-org/TarkovTracker/commit/406968b2170f9aad606b7e1cd7a703c3b60471bc))
* update background color styles for improved UI aesthetics ([4fd14f9](https://github.com/tarkovtracker-org/TarkovTracker/commit/4fd14f93e47a55376afba3d82fdcd2601244a896))
* **i18n:** update chinese translation ([92eb862](https://github.com/tarkovtracker-org/TarkovTracker/commit/92eb8623e6d88a20b482c0a727208e486a9c178e))
* Update comprehensive analysis document with architecture overview, technology stack, and identified issues ([efb990a](https://github.com/tarkovtracker-org/TarkovTracker/commit/efb990a0378b395d1d7250455c2ff2ae4af3431d))
* update localization strings ([1a1f650](https://github.com/tarkovtracker-org/TarkovTracker/commit/1a1f650dd4008073c897ee2738e6c8b34210ea26))
* **api-gateway:** update OpenAPI validation and configuration, add API_HOST variable ([2b064dc](https://github.com/tarkovtracker-org/TarkovTracker/commit/2b064dc5341f838518e4112b212f3f4e2ce55c8a))
* **ui:** update page layouts and error states ([2324ba4](https://github.com/tarkovtracker-org/TarkovTracker/commit/2324ba41b1a3bcfe1acb1f6efbc1de9ec121c912))
* **settings:** update settings UI and skills card ([8721a7e](https://github.com/tarkovtracker-org/TarkovTracker/commit/8721a7eff2834e8c75929b899128afb6e2feca47))
* Update Supabase client imports and enhance token management functions ([3344590](https://github.com/tarkovtracker-org/TarkovTracker/commit/33445908a671bc4e191595fc84d827464fec125b))
* **i18n:** update translations for all locales ([55e37bb](https://github.com/tarkovtracker-org/TarkovTracker/commit/55e37bbf05d85a00ba1b0f6e8d54017f9b8fb2a6))
* **i18n:** update welcome message to include user display name across multiple languages ([214e9fe](https://github.com/tarkovtracker-org/TarkovTracker/commit/214e9fe96956d226c8cb1f3ebe72107a02bf8d11))


### Performance Improvements

* **api:** implement LRU eviction for changelog stats cache ([9310be9](https://github.com/tarkovtracker-org/TarkovTracker/commit/9310be966708abb8132811de8c2a429370c3a481))
* memoize levels and harden dashboard fallback ([da900c9](https://github.com/tarkovtracker-org/TarkovTracker/commit/da900c9ed6d41050448c136fcd99a9b68706a6c6))
* remove graphology from initial client bundle ([9e1975f](https://github.com/tarkovtracker-org/TarkovTracker/commit/9e1975fc2a528615d95bd49484487bd64b1a9289))


### Reverts

* Revert "feat(ci): add CI/CD automation, git hooks, and dev tooling ([#142](https://github.com/tarkovtracker-org/TarkovTracker/issues/142))" ([#154](https://github.com/tarkovtracker-org/TarkovTracker/issues/154)) ([f664655](https://github.com/tarkovtracker-org/TarkovTracker/commit/f66465556ab95617491bb9715ff319154514a117))
* Revert "Revert "feat(ci): add CI/CD automation, git hooks, and dev tooling (#…" ([#155](https://github.com/tarkovtracker-org/TarkovTracker/issues/155)) ([bfa0dbd](https://github.com/tarkovtracker-org/TarkovTracker/commit/bfa0dbdf17680bb496e614654c35af0a4bc4d2b8))
