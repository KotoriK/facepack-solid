import { p as processTemplate } from './template-BmwbrKSM.js';

const importJSON = (url) => fetch(url).then(
  (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Fetch Error:Return HTTP ${response.status}, ${response.statusText}`);
    }
  }
);

function getFaceFullUrl(face, parentPack) {
  const _face = typeof face == "string" ? { id: face } : face;
  const _process = (ph) => processTemplate("{", "}", (str) => {
    if (str == "id") {
      return _face.id;
    } else if (str in parentPack) {
      return parentPack[str];
    } else {
      return `{${str}}`;
    }
  }, ph);
  const { url, ...other_key } = _face;
  return {
    ...other_key,
    url: _process(url && _process(url) || parentPack.default)
  };
}

async function importExternalFacePacks(url) {
  const json = await importJSON(url);
  if (json) {
    preprocessFacePack(json);
    return json;
  }
  throw new Error(`Try to load FacePacks from '${url}' failed.`);
}
function preprocessFacePack(facepacks) {
  for (const pack of facepacks) {
    pack.faces = pack.faces.map((face) => getFaceFullUrl(face, pack));
  }
}

export { getFaceFullUrl as g, importExternalFacePacks as i, preprocessFacePack as p };
//# sourceMappingURL=FacePacksImporter-B-vHgGoI.js.map
