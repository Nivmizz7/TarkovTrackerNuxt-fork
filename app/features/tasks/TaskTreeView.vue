<template>
  <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
    <div
      ref="canvasRef"
      class="min-h-[70vh] w-full overflow-auto rounded-2xl border border-white/10 bg-surface-900/70 p-4"
      :class="isPanning ? 'cursor-grabbing' : 'cursor-grab'"
      tabindex="0"
      @click="focusCanvas"
      @keydown="onKeyScroll"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <div class="relative" :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }">
        <svg
          class="pointer-events-none absolute inset-0"
          :width="canvasWidth"
          :height="canvasHeight"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="rgba(148,163,184,0.8)" />
            </marker>
          </defs>
          <path
            v-for="edge in edges"
            :key="edge.key"
            :d="edge.path"
            stroke="rgba(148,163,184,0.7)"
            stroke-width="1.5"
            fill="none"
            marker-end="url(#arrowhead)"
          />
        </svg>
        <div
          v-for="node in nodes"
          :key="node.key"
          class="absolute rounded-lg shadow-sm"
          :style="{
            left: `${node.x}px`,
            top: `${node.y}px`,
            width: `${NODE_WIDTH}px`,
            height: `${NODE_HEIGHT}px`,
          }"
        >
          <div
            class="relative flex h-full w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-xs text-white transition hover:brightness-110"
            :class="statusBgClass(node.taskId)"
          >
            <div
              v-if="isKappaTask(node.taskId)"
              class="absolute left-0 right-0 top-0 rounded-t-lg bg-black/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white"
            >
              Kappa
            </div>
            <div
              v-if="isLightkeeperTask(node.taskId)"
              class="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white"
            >
              Lightkeeper
            </div>
            <button
              type="button"
              class="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-white/70 bg-white/10"
              :class="validationSquareClass(node.taskId)"
              :aria-label="`Valider ${tasksById.get(node.taskId)?.name ?? 'Task'}`"
              @click.stop="completeTask(node.taskId)"
            />
            <button
              type="button"
              class="flex-1 text-left leading-tight"
              @click="goToTask(node.taskId)"
            >
              {{ tasksById.get(node.taskId)?.name ?? 'Task' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-2xl border border-white/10 bg-surface-900/70 p-4">
      <div class="mb-3 text-sm font-semibold text-gray-200">Quetes disponibles</div>
      <div v-if="userView === 'all'" class="text-xs text-gray-400">
        Selectionne un joueur pour valider les quetes.
      </div>
      <div v-else-if="availableTasks.length === 0" class="text-xs text-gray-400">
        Aucune quete disponible.
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="task in availableTasks"
          :key="task.id"
          class="flex items-center justify-between gap-2"
        >
          <span class="text-xs text-gray-200">{{ task.name ?? 'Task' }}</span>
          <UButton size="xs" color="primary" variant="solid" @click="completeTask(task.id)">
            Valider
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { buildQuestTree, type TaskTreeNode } from '@/composables/useQuestTree';
  import { useTaskActions } from '@/composables/useTaskActions';
  import { useMetadataStore } from '@/stores/useMetadata';
  import { usePreferencesStore } from '@/stores/usePreferences';
  import { useProgressStore } from '@/stores/useProgress';
  import type { Task } from '@/types/tarkov';

  const props = defineProps<{
    tasks: Task[];
  }>();

  const emit = defineEmits<{
    'on-task-action': [
      event: {
        taskId: string;
        taskName: string;
        action: string;
        undoKey?: string;
        statusKey?: string;
      },
    ];
  }>();

  const preferencesStore = usePreferencesStore();
  const progressStore = useProgressStore();
  const metadataStore = useMetadataStore();
  const router = useRouter();
  const canvasRef = ref<HTMLElement | null>(null);
  const userView = computed(() => preferencesStore.getTaskUserView);
  const teamIds = computed(() => Object.keys(progressStore.visibleTeamStores || {}));
  const tasksById = computed(() => new Map(props.tasks.map((task) => [task.id, task])));
  const lightkeeperTraderId = computed(() => metadataStore.getTraderByName('lightkeeper')?.id);
  const NODE_WIDTH = 240;
  const NODE_HEIGHT = 60;
  const H_SPACING = 200;
  const V_SPACING = 140;
  const CANVAS_PADDING = 100;
  const isPanning = ref(false);
  const panStart = ref({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const actionTask = ref<Task | null>(null);
  const { markTaskComplete } = useTaskActions(
    () => actionTask.value as Task,
    (payload) => emit('on-task-action', payload)
  );

  const statusById = computed(() => {
    const statuses = new Map<string, 'locked' | 'available' | 'inprogress' | 'completed'>();
    props.tasks.forEach((task) => {
      const taskFaction = task.factionName;
      if (userView.value === 'all') {
        const relevantTeamIds = teamIds.value.filter((teamId) => {
          const teamFaction = progressStore.playerFaction[teamId];
          return taskFaction === 'Any' || taskFaction === teamFaction;
        });
        if (relevantTeamIds.length === 0) {
          statuses.set(task.id, 'locked');
          return;
        }
        const isCompletedByAll = relevantTeamIds.every(
          (teamId) => progressStore.tasksCompletions?.[task.id]?.[teamId] === true
        );
        if (isCompletedByAll) {
          statuses.set(task.id, 'completed');
          return;
        }
        const isAvailableForAny = relevantTeamIds.some((teamId) => {
          const isUnlocked = progressStore.unlockedTasks?.[task.id]?.[teamId] === true;
          const isCompleted = progressStore.tasksCompletions?.[task.id]?.[teamId] === true;
          return isUnlocked && !isCompleted;
        });
        if (!isAvailableForAny) {
          statuses.set(task.id, 'locked');
          return;
        }
        const isInProgress = relevantTeamIds.some((teamId) =>
          isTaskInProgress(task, teamId)
        );
        statuses.set(task.id, isInProgress ? 'inprogress' : 'available');
        return;
      }
      const userFaction = progressStore.playerFaction[userView.value];
      if (taskFaction !== 'Any' && taskFaction !== userFaction) {
        statuses.set(task.id, 'locked');
        return;
      }
      const isCompleted = progressStore.tasksCompletions?.[task.id]?.[userView.value] === true;
      if (isCompleted) {
        statuses.set(task.id, 'completed');
        return;
      }
      const isUnlocked = progressStore.unlockedTasks?.[task.id]?.[userView.value] === true;
      if (!isUnlocked) {
        statuses.set(task.id, 'locked');
        return;
      }
      const isInProgress = isTaskInProgress(task, userView.value);
      statuses.set(task.id, isInProgress ? 'inprogress' : 'available');
    });
    return statuses;
  });

  const statusBgClass = (taskId: string) => {
    const status = statusById.value.get(taskId);
    if (status === 'available') return 'bg-emerald-700/60';
    if (status === 'inprogress' || status === 'completed') return 'bg-gray-700/60';
    return 'bg-red-700/60';
  };

  const validationSquareClass = (taskId: string) => {
    const status = statusById.value.get(taskId);
    if (status === 'available') return 'bg-emerald-400/80';
    if (status === 'inprogress') return 'bg-gray-300/70';
    if (status === 'completed') return 'bg-gray-500/60';
    return 'bg-red-400/70';
  };

  interface PositionedNode {
    key: string;
    taskId: string;
    x: number;
    y: number;
  }

  interface EdgePath {
    key: string;
    path: string;
  }

  const treeRoots = computed(() => buildQuestTree(props.tasks, props.tasks));

  const layout = computed(() => buildLayout(treeRoots.value));
  const nodes = computed(() => layout.value.nodes);
  const edges = computed(() => layout.value.edges);
  const canvasWidth = computed(() => layout.value.width);
  const canvasHeight = computed(() => layout.value.height);

  function buildLayout(nodes: TaskTreeNode[]) {
    const nodeDepth = new WeakMap<TaskTreeNode, number>();
    const nodeOrder = new WeakMap<TaskTreeNode, number>();
    let currentOrder = 0;
    let maxDepth = 0;
    let maxOrder = 0;

    const assignOrder = (node: TaskTreeNode, depth: number, lineage: Set<TaskTreeNode>) => {
      if (lineage.has(node)) {
        const existingOrder = nodeOrder.get(node);
        if (existingOrder !== undefined) return existingOrder;
        nodeOrder.set(node, currentOrder);
        return currentOrder;
      }
      nodeDepth.set(node, depth);
      maxDepth = Math.max(maxDepth, depth);
      const childLineage = new Set(lineage);
      childLineage.add(node);

      if (!node.children.length) {
        const order = currentOrder++;
        nodeOrder.set(node, order);
        maxOrder = Math.max(maxOrder, order);
        return order;
      }
      const childOrders = node.children.map((child) => assignOrder(child, depth + 1, childLineage));
      if (childOrders.length === 0) {
        const order = currentOrder++;
        nodeOrder.set(node, order);
        maxOrder = Math.max(maxOrder, order);
        return order;
      }
      const minOrder = Math.min(...childOrders);
      const maxChildOrder = Math.max(...childOrders);
      const order = (minOrder + maxChildOrder) / 2;
      nodeOrder.set(node, order);
      maxOrder = Math.max(maxOrder, order);
      return order;
    };

    nodes.forEach((node) => assignOrder(node, 0, new Set()));

    const positioned: PositionedNode[] = [];
    const edgePaths: EdgePath[] = [];

    const toCoords = (node: TaskTreeNode) => {
      const depth = nodeDepth.get(node) ?? 0;
      const order = nodeOrder.get(node) ?? 0;
      const x = depth * (NODE_WIDTH + H_SPACING) + CANVAS_PADDING;
      const y = order * (NODE_HEIGHT + V_SPACING) + CANVAS_PADDING;
      return { x, y };
    };

    const traverse = (node: TaskTreeNode, keyPrefix: string) => {
      const coords = toCoords(node);
      positioned.push({
        key: `${keyPrefix}-${node.task.id}`,
        taskId: node.task.id,
        x: coords.x,
        y: coords.y,
      });
      node.children.forEach((child, index) => {
        const childCoords = toCoords(child);
        const path = buildEdgePath(coords, childCoords);
        edgePaths.push({
          key: `${node.task.id}-${child.task.id}-${index}-${keyPrefix}`,
          path,
        });
        traverse(child, `${keyPrefix}-${index}`);
      });
    };

    nodes.forEach((node, index) => traverse(node, `root-${index}`));

    const width = (maxDepth + 1) * (NODE_WIDTH + H_SPACING) + CANVAS_PADDING * 2;
    const height = (maxOrder + 1) * (NODE_HEIGHT + V_SPACING) + CANVAS_PADDING * 2;

    return { nodes: positioned, edges: edgePaths, width, height };
  }

  function buildEdgePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
    const startX = from.x + NODE_WIDTH;
    const startY = from.y + NODE_HEIGHT / 2;
    const endX = to.x;
    const endY = to.y + NODE_HEIGHT / 2;
    const offset = (endX - startX) / 2;
    return `M ${startX} ${startY} C ${startX + offset} ${startY}, ${endX - offset} ${endY}, ${endX} ${endY}`;
  }

  const isTaskInProgress = (task: Task, teamId: string) => {
    if (!task.objectives?.length) return false;
    return task.objectives.some(
      (objective) => progressStore.objectiveCompletions?.[objective.id]?.[teamId] === true
    );
  };

  const isKappaTask = (taskId: string) => {
    return tasksById.value.get(taskId)?.kappaRequired === true;
  };

  const isLightkeeperTask = (taskId: string) => {
    const task = tasksById.value.get(taskId);
    if (!task) return false;
    if (task.lightkeeperRequired === true) return true;
    if (lightkeeperTraderId.value) {
      return task.trader?.id === lightkeeperTraderId.value;
    }
    return task.trader?.name?.toLowerCase() === 'lightkeeper';
  };

  const goToTask = (taskId: string) => {
    preferencesStore.setTaskPrimaryView('all');
    router.push({ path: '/tasks', query: { task: taskId } });
  };

  const availableTasks = computed(() => {
    if (userView.value === 'all') return [];
    return props.tasks
      .filter((task) => {
        const status = statusById.value.get(task.id);
        return status === 'available' || status === 'inprogress';
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  });

  const completeTask = (taskId: string) => {
    if (userView.value === 'all') return;
    const status = statusById.value.get(taskId);
    if (status !== 'available' && status !== 'inprogress') return;
    const task = tasksById.value.get(taskId);
    if (!task) return;
    actionTask.value = task;
    markTaskComplete();
  };

  const onKeyScroll = (event: KeyboardEvent) => {
    if (!canvasRef.value) return;
    const step = 120;
    if (event.key === 'ArrowRight') {
      canvasRef.value.scrollBy({ left: step, behavior: 'smooth' });
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      canvasRef.value.scrollBy({ left: -step, behavior: 'smooth' });
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      canvasRef.value.scrollBy({ top: step, behavior: 'smooth' });
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      canvasRef.value.scrollBy({ top: -step, behavior: 'smooth' });
      event.preventDefault();
    }
  };

  const focusCanvas = () => {
    canvasRef.value?.focus();
  };

  const onMouseDown = (event: MouseEvent) => {
    if (!canvasRef.value || event.button !== 1) return;
    isPanning.value = true;
    panStart.value = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: canvasRef.value.scrollLeft,
      scrollTop: canvasRef.value.scrollTop,
    };
    event.preventDefault();
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isPanning.value || !canvasRef.value) return;
    const dx = event.clientX - panStart.value.x;
    const dy = event.clientY - panStart.value.y;
    canvasRef.value.scrollLeft = panStart.value.scrollLeft - dx;
    canvasRef.value.scrollTop = panStart.value.scrollTop - dy;
  };

  const onMouseUp = () => {
    isPanning.value = false;
  };
</script>
