import { iconMark } from "@/lib/iconMark";

// iOS masks its own rounded corners, so this one stays square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return iconMark(180, { rounded: false });
}
