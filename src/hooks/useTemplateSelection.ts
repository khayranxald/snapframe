"use client";
/**
 * useTemplateSelection — Hook Pemilihan Template
 * 📍 src/hooks/useTemplateSelection.ts
 */
import { useState, useCallback } from "react";
import { TEMPLATES, DEFAULT_TEMPLATE, getTemplateById, type PhotoboothTemplate } from "@/data/templates";

interface UseTemplateSelectionReturn {
  selectedId: string;
  hoveredId: string | null;
  selected: PhotoboothTemplate;
  hovered: PhotoboothTemplate | null;
  templates: PhotoboothTemplate[];
  select: (id: string) => void;
  setHovered: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  isHovered: (id: string) => boolean;
}

export function useTemplateSelection(): UseTemplateSelectionReturn {
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_TEMPLATE.id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const select = useCallback((id: string) => setSelectedId(id), []);
  const setHovered = useCallback((id: string | null) => setHoveredId(id), []);
  const isSelected = useCallback((id: string) => id === selectedId, [selectedId]);
  const isHovered = useCallback((id: string) => id === hoveredId, [hoveredId]);

  const selected = getTemplateById(selectedId) ?? DEFAULT_TEMPLATE;
  const hovered = hoveredId ? (getTemplateById(hoveredId) ?? null) : null;

  return {
    selectedId,
    hoveredId,
    selected,
    hovered,
    templates: TEMPLATES,
    select,
    setHovered,
    isSelected,
    isHovered,
  };
}
