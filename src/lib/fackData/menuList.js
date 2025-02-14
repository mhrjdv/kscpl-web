import menu_image_1 from "@/assets/images/menu-image-1.png";
export const menuList = [
  {
    id: 1,
    name: "Home",
    path: "/",
    isMegaMenu: false,
    isDropdown: false,
  },
  {
    id: 2,
    name: "About",
    path: "/about-us",
    isMegaMenu: false,
    isDropdown: [
      {
        id: 1,
        name: "Associations",
        path: "/about-us/associations"
      }
    ],
  },
  {
    id: 3,
    name: "Construction",
    path: "/construction",
    isDropdown: false,
    isMegaMenu: [
      {
        id: 1,
        menus: [
          {
            id: 1,
            name: "Commercial",
            path: "/construction/commercial",
            desc: " Turning Blueprints into Iconic Landmarks",
          },
          {
            id: 2,
            name: "Infrastructure",
            path: "/construction/infrastructure",
            desc: "Beyond Concrete, We Build Legacies",
          },
          {
            id: 3,
            name: "Institutional",
            path: "/construction/institutional",
            desc: " Building Foundations, Shaping Future Leaders.",
          },
        ],
      },
      {
        id: 2,
        menus: [
          {
            id: 4,
            name: "R + C",
            path: "/construction/residential-and-commercial",
            desc: "From Vision to Structure, We Make It Happen",
          },
          {
            id: 5,
            name: "Residential",
            path: "/construction/residential",
            desc: "Crafting Luxurious Homes, Nurturing Thriving Communities",
          },
          {
            id: 6,
            name: "Show All",
            path: "/construction/show-all",
            desc: "Raising the Bar, One Project at a Time",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Realty",
    path: "/realty",
    isMegaMenu: false,
    isDropdown: false,
  },
  {
    id: 5,
    name: "News & Updates",
    path: "/news-and-updates",
    isMegaMenu: false,
    isDropdown: false,
  },
  {
    id: 6,
    name: "Contact",
    path: "/contact",
    isMegaMenu: false,
    isDropdown: false,
  },
];
