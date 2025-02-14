export async function getNavbarData() {
  const response = await fetch("https://kscplcms.cubeone.in/api/navbar");
  const json = await response.json();
  return json;
}
