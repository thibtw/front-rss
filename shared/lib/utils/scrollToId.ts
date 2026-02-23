import { ContainerId } from "@/widgets/Header/model/headerNav";

export function scrollToId(id: ContainerId): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
