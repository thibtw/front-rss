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
  const color =
    priority === "high"
      ? "text-red-400"
      : priority === "medium"
        ? "text-yellow-400"
        : "text-gray-400";
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded ${color}`}
      title={priority}
    >
      {priority === "high" ? (
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
          <path d="M8 2L2 14h4l-1 4 6-12H7l1-4z" />
        </svg>
      ) : (
        <span className="text-xs font-bold">!</span>
      )}
    </span>
  );
}

function KanbanCard({
  card,
  isDragging = false,
}: {
  card: Card;
  isDragging?: boolean;
}): React.JSX.Element {
  return (
    <div
      className={`rounded-lg border bg-black/40 p-3 transition-shadow ${
        isDragging
          ? "border-white/40 shadow-lg opacity-90 rotate-1 scale-[1.02]"
          : "border-white/10 hover:border-white/20 hover:bg-white/5 cursor-grab active:cursor-grabbing"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs text-gray-500 font-mono">{card.key}</span>
        <PriorityIcon priority={card.priority} />
      </div>
      <p className="font-medium text-white text-sm leading-tight">
        {card.role}
      </p>
      <p className="text-gray-400 text-xs mt-0.5">{card.company}</p>
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-gray-400">
          {card.platform}
        </span>
        <span className="text-[10px] text-gray-500">{card.appliedAt}</span>
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

  return (
    <div
      ref={setNodeRef}
      className={`min-w-0 flex-1 flex flex-col rounded-xl border overflow-hidden transition-colors ${
        isOver ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10"
      }`}
    >
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-sm text-gray-400 tabular-nums">
          {cards.length}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-3 min-h-[280px]">
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
        <h1 className="text-4xl font-bold mb-2">My Applications</h1>
        <p className="text-gray-400 mb-6">
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
