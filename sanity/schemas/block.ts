const Content = {
  name: "Content",
  title: "Page Content",
  type: "document",
  fields: [
    {
      name: "page",
      title: "page",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
export default Content;
