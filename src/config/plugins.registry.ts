import { createPluginRegistration } from "@embedpdf/core";
import { Rotation } from "@embedpdf/models";
import { DocumentManagerPluginPackage } from "@embedpdf/plugin-document-manager/react";
import { InteractionManagerPluginPackage } from "@embedpdf/plugin-interaction-manager/react";
import { PanPluginPackage } from "@embedpdf/plugin-pan/react";
import { RenderPluginPackage } from "@embedpdf/plugin-render/react";
import { RotatePluginPackage } from "@embedpdf/plugin-rotate/react";
import { ScrollPluginPackage, ScrollStrategy } from "@embedpdf/plugin-scroll/react";
import { SearchPluginPackage } from "@embedpdf/plugin-search/react";
import { SelectionPluginPackage } from "@embedpdf/plugin-selection/react";
import { SpreadMode, SpreadPluginPackage } from "@embedpdf/plugin-spread/react";
import { ThumbnailPluginPackage } from "@embedpdf/plugin-thumbnail/react";
import { TilingPluginPackage } from "@embedpdf/plugin-tiling/react";
import { ViewportPluginPackage } from "@embedpdf/plugin-viewport/react";
import { ZoomMode, ZoomPluginPackage } from "@embedpdf/plugin-zoom/react";

export function buildPlugins() {
  return [
    createPluginRegistration(DocumentManagerPluginPackage, {
      initialDocuments: [],
      maxDocuments: 10,
    }),
    createPluginRegistration(ViewportPluginPackage, { viewportGap: 20 }),
    createPluginRegistration(ScrollPluginPackage, {
      defaultStrategy: ScrollStrategy.Vertical,
      defaultPageGap: 10,
    }),
    createPluginRegistration(RenderPluginPackage, {
      withForms: true,
      withAnnotations: false,
    }),
    createPluginRegistration(TilingPluginPackage, {
      tileSize: 768,
      overlapPx: 2.5,
      extraRings: 0,
    }),
    createPluginRegistration(ThumbnailPluginPackage, {
      width: 120,
      gap: 8,
      buffer: 3,
      labelHeight: 16,
      autoScroll: true,
    }),
    createPluginRegistration(InteractionManagerPluginPackage),
    createPluginRegistration(ZoomPluginPackage, {
      defaultZoomLevel: ZoomMode.FitWidth,
    }),
    createPluginRegistration(SearchPluginPackage, {
      flags: [],
      showAllResults: true,
    }),
    createPluginRegistration(SelectionPluginPackage, {
      marquee: { enabled: true },
    }),
    createPluginRegistration(RotatePluginPackage, {
      defaultRotation: Rotation.Degree0,
    }),
    createPluginRegistration(SpreadPluginPackage, {
      defaultSpreadMode: SpreadMode.None,
    }),
    createPluginRegistration(PanPluginPackage, {
      defaultMode: "mobile",
    }),
  ];
}
