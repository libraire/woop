/**
 * name: RGB to Hex
 * usage: Convert RGB to Hex
 * args: No
 **/

function convert(rgb) {
  rgb = rgb.toUpperCase();
  rgb = rgb.replace("RGB", "");
  rgb = rgb.replace("(", "");
  rgb = rgb.replace(")", "");
  const rgbArray = rgb.includes(",") ? rgb.split(",") : rgb.split(" ");
  let hex = "#";
  try {
    rgbArray.forEach((c) => {
      hex += parseInt(c).toString(16);
    });
  } catch (error) {
    return "Invalid RGB value";
  }

  return hex.toUpperCase();
}
