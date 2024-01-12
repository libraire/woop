/**
 * name: Random Character
 * usage: Generate characters randomly with specific length
 * args: No
 **/

function randomChar(text) {
  if (text.length == 0) {
    return "Input the length to generate ${length}, e.g. 10";
  }

  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,.-=";
  let password = "";
  for (let i = 0; i < text; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}
