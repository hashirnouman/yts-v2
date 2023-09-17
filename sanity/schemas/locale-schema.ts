const locale = {
  name: "locale",
  title: "locale",
  type: "document",
  fields: [
    { name: "key", title: "Key", type: "string" },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Arabic", value: "ar" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "value",
      title: "Value",
      type: "string",
    },
  ],
};
export default locale;
