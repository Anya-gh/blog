interface StringMap {
  [key: string]: Theme;
}

type Theme = {
  style: string,
  credit?: string
}

export const themes: StringMap = {
  sunset: {
    style: `bg-[url('./assets/bgs/sunset.jpg')] bg-cover bg-center`,
  },
  piano: {
    style: `bg-[url('./assets/bgs/person-playing-piano.jpg')] bg-cover bg-center`,
  },
  temp: {
    style: `bg-[url('./assets/bgs/pexels-tirachard-kumtanom-733856.jpg')] bg-cover bg-center`,
  },
  ggst: {
    style: `bg-[url('./assets/bgs/ggst.png')] bg-cover bg-center`,
    credit: 'All credit goes to Arc System Works for the background image.'
  },
  japan: {
    style: `bg-[url('./assets/bgs/japan.jpg')] bg-cover bg-center`,
    credit: `Photo by Su San Lee on Unsplash`
  
  }
}