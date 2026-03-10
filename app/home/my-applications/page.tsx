"use client";

import React, { useState, useCallback } from "react";
import Sidebar from "@/widgets/Sidebar";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Priority = "high" | "medium" | "low";

type Card = {
  id: string;
  key: string;
  company: string;
  role: string;
  priority: Priority;
  platform: string;
  appliedAt: string;
};

type ColumnId = "new" | "applied" | "response" | "interview" | "offer";

const COLUMN_IDS: ColumnId[] = [
  "new",
  "applied",
  "response",
  "interview",
  "offer",
];

const COLUMN_TITLES: Record<ColumnId, string> = {
  new: "NEW",
  applied: "APPLIED",
  response: "RESPONSE",
  interview: "INTERVIEW",
  offer: "OFFER",
};

const COLUMN_COLORS: Record<
  ColumnId,
  { header: string; border: string; drop: string }
> = {
  new: {
    header: "bg-sky-500/20 border-sky-400/50 text-sky-300",
    border: "border-sky-400/30",
    drop: "border-sky-400 bg-sky-500/10",
  },
  applied: {
    header: "bg-amber-500/20 border-amber-400/50 text-amber-300",
    border: "border-amber-400/30",
    drop: "border-amber-400 bg-amber-500/10",
  },
  response: {
    header: "bg-emerald-500/20 border-emerald-400/50 text-emerald-300",
    border: "border-emerald-400/30",
    drop: "border-emerald-400 bg-emerald-500/10",
  },
  interview: {
    header: "bg-violet-500/20 border-violet-400/50 text-violet-300",
    border: "border-violet-400/30",
    drop: "border-violet-400 bg-violet-500/10",
  },
  offer: {
    header: "bg-green-500/20 border-green-400/50 text-green-300",
    border: "border-green-400/30",
    drop: "border-green-400 bg-green-500/10",
  },
};

const initialBoard: Record<ColumnId, Card[]> = {
  new: [
    {
      id: "1",
      key: "APP-1",
      company: "Spotify",
      role: "Senior NestJS Engineer",
      priority: "high",
      platform: "LinkedIn",
      appliedAt: "2d ago",
    },
    {
      id: "2",
      key: "APP-2",
      company: "Stripe",
      role: "Backend Engineer",
      priority: "medium",
      platform: "Indeed",
      appliedAt: "1d ago",
    },
    {
      id: "3",
      key: "APP-3",
      company: "Revolut",
      role: "Lead Developer",
      priority: "high",
      platform: "Jooble",
      appliedAt: "3d ago",
    },
    {
      id: "4",
      key: "APP-4",
      company: "GitHub",
      role: "Staff Engineer",
      priority: "high",
      platform: "LinkedIn",
      appliedAt: "—",
    },
    {
      id: "5",
      key: "APP-5",
      company: "Vercel",
      role: "Full Stack Developer",
      priority: "medium",
      platform: "WeWorkRemotely",
      appliedAt: "—",
    },
  ],
  applied: [
    {
      id: "6",
      key: "APP-6",
      company: "Tech Corp",
      role: "Senior Frontend Developer",
      priority: "medium",
      platform: "LinkedIn",
      appliedAt: "5d ago",
    },
    {
      id: "7",
      key: "APP-7",
      company: "StartupXYZ",
      role: "React Developer",
      priority: "low",
      platform: "Indeed",
      appliedAt: "7d ago",
    },
  ],
  response: [
    {
      id: "8",
      key: "APP-8",
      company: "Innovation Labs",
      role: "Software Engineer",
      priority: "high",
      platform: "Jooble",
      appliedAt: "4d ago",
    },
  ],
  interview: [
    {
      id: "9",
      key: "APP-9",
      company: "BigTech Inc",
      role: "Full Stack Engineer",
      priority: "high",
      platform: "LinkedIn",
      appliedAt: "Interview tomorrow",
    },
  ],
  offer: [],
};

function PriorityIcon({ priority }: { priority: Priority }): React.JSX.Element {
  const style =
    priority === "high"
      ? "bg-red-500/30 text-red-300 border border-red-400/50"
      : priority === "medium"
        ? "bg-amber-500/30 text-amber-300 border border-amber-400/50"
        : "bg-slate-500/30 text-slate-400 border border-slate-500/50";
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded ${style}`}
      title={priority}
    >
      {priority === "high" ? (
        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
          <path d="M8 2L2 14h4l-1 4 6-12H7l1-4z" />
        </svg>
      ) : (
        <span className="text-xs font-bold">!</span>
      )}
    </span>
  );
}

const PRIORITY_BORDER: Record<Priority, string> = {
  high: "border-l-red-500",
  medium: "border-l-amber-500",
  low: "border-l-slate-500",
};

const PLATFORM_COLOR: Record<string, string> = {
  LinkedIn: "bg-blue-500/25 text-blue-300 border border-blue-400/40",
  Indeed: "bg-purple-500/25 text-purple-300 border border-purple-400/40",
  Jooble: "bg-orange-500/25 text-orange-300 border border-orange-400/40",
  WeWorkRemotely: "bg-teal-500/25 text-teal-300 border border-teal-400/40",
};

function KanbanCard({
  card,
  isDragging = false,
}: {
  card: Card;
  isDragging?: boolean;
}): React.JSX.Element {
  const platformStyle =
    PLATFORM_COLOR[card.platform] ??
    "bg-white/10 text-gray-400 border border-white/10";
  return (
    <div
      className={`rounded-lg border-l-4 border bg-black/50 p-3 transition-shadow ${PRIORITY_BORDER[card.priority]} ${
        isDragging
          ? "border-white/40 shadow-lg shadow-sky-500/20 opacity-95 rotate-1 scale-[1.02]"
          : "border-white/10 hover:border-white/25 hover:bg-white/5 cursor-grab active:cursor-grabbing"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs text-sky-300/90 font-mono">{card.key}</span>
        <PriorityIcon priority={card.priority} />
      </div>
      <p className="font-medium text-white text-sm leading-tight">
        {card.role}
      </p>
      <p className="text-gray-300 text-xs mt-0.5">{card.company}</p>
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-medium ${platformStyle}`}
        >
          {card.platform}
        </span>
        <span className="text-[10px] text-gray-400">{card.appliedAt}</span>
      </div>
    </div>
  );
}

function DraggableCard({
  card,
  columnId,
}: {
  card: Card;
  columnId: ColumnId;
}): React.JSX.Element {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: { card, columnId },
    });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <KanbanCard card={card} isDragging={isDragging} />
    </div>
  );
}

function DroppableColumn({
  columnId,
  title,
  cards,
}: {
  columnId: ColumnId;
  title: string;
  cards: Card[];
}): React.JSX.Element {
  const { isOver, setNodeRef } = useDroppable({ id: columnId });
  const colors = COLUMN_COLORS[columnId];
  const headerClass = colors.header;
  const borderClass = colors.border;
  const dropClass = colors.drop;

  return (
    <div
      ref={setNodeRef}
      className={`min-w-0 flex-1 flex flex-col rounded-xl border overflow-hidden transition-colors ${
        isOver ? dropClass : `bg-white/5 ${borderClass}`
      }`}
    >
      <div
        className={`px-4 py-3 border-b flex items-center justify-between ${headerClass}`}
      >
        <span className="font-semibold">{title}</span>
        <span className="text-sm font-medium tabular-nums opacity-90">
          {cards.length}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-3 min-h-[280px] bg-black/20">
        {cards.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-8 text-gray-500 text-sm">
            No items
          </div>
        ) : (
          cards.map((card) => (
            <DraggableCard key={card.id} card={card} columnId={columnId} />
          ))
        )}
      </div>
    </div>
  );
}

export default function MyApplicationsPage(): React.JSX.Element {
  const [board, setBoard] = useState<Record<ColumnId, Card[]>>(initialBoard);
  const [activeCard, setActiveCard] = useState<{
    card: Card;
    columnId: ColumnId;
  } | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent): void => {
    const { active } = event;
    const data = active.data.current as
      | { card: Card; columnId: ColumnId }
      | undefined;
    if (data) setActiveCard(data);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent): void => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const sourceData = active.data.current as
      | { card: Card; columnId: ColumnId }
      | undefined;
    const targetColumnId = over.id as ColumnId;
    if (!sourceData || !COLUMN_IDS.includes(targetColumnId)) return;
    if (sourceData.columnId === targetColumnId) return;

    setBoard((prev) => {
      const sourceColumn = sourceData.columnId;
      const card = sourceData.card;
      const newBoard = { ...prev };
      newBoard[sourceColumn] = prev[sourceColumn].filter(
        (c) => c.id !== card.id
      );
      newBoard[targetColumnId] = [...prev[targetColumnId], card];
      return newBoard;
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 py-8 flex flex-col">
        <h1 className="text-4xl font-bold mb-2 text-white">My Applications</h1>
        <p className="text-sky-200/80 mb-6">
          Kanban board — drag cards between columns
        </p>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 flex-1 min-h-0">
            {COLUMN_IDS.map((columnId) => (
              <DroppableColumn
                key={columnId}
                columnId={columnId}
                title={COLUMN_TITLES[columnId]}
                cards={board[columnId]}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard ? (
              <div className="w-64 max-w-[20vw]">
                <KanbanCard card={activeCard.card} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
