type AppType = {
  id: string;
  name: string;
  description: string;
  developers: Array<string>;
  publishers: Array<string>;
  genres: Array<string>;
  image: string;
  installed?: boolean;
};

export default AppType;
