/**
 * name: Hex to RGB
 * usage: Convert Hex to RGB
 * args: No
 **/

function hexToRgb(hex) {
  // Remove the hash symbol if present
  hex = hex.replace("#", "");

  // Parse the hexadecimal components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB representation
  return `RGB(${r}, ${g}, ${b})`;
}
