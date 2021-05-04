const CategoryPreview = ({ category }) => {
  return (
    <>
      <h1>{category.title}</h1>
      {JSON.stringify(category, null, 2)}
      <br />
    </>
  );
};

export default CategoryPreview;
