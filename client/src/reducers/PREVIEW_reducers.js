export default function PREVIEW(state = {
  project: 0,
galleryBG: "/img/thumb/middle-earth/bg.jpg",
logoBG:  "/img/thumb/middle-earth/logo.png",
galleryLayer:  "/img/thumb/middle-earth/middle-earth_gallery_Layer.png",
galleryLayer2:  "/img/thumb/middle-earth/middle-earth_gallery_Layer2.png"
}, action) {
  switch (action.type) {
    case 'getID':
      return state = {
        project: action.text,
        name: action.name,
        id: action.id,
        desc:action.desc,
        role:action.role,
        client: action.client,
        galleryBG: action.galleryBG,
        logoBG : action.logoBG,
        galleryLayer : action.galleryLayer,
        galleryLayer2: action.galleryLayer2,
        galleryBGViewer: action.galleryBGViewer,
        chapter: action.chapter,
        index: action.index
      }
    default:
      return state
  }
}
