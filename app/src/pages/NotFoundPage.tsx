const NotFoundPage = () => {
  return (
    <div className="p-4 text-center dark:text-white">
      <p className="text-5xl pb-4">X</p>
      <strong className="text-3xl">Not found</strong>
      <p className="text-2xl">Page not found</p>
      <small className="text-xl">You can go back</small>
      <p className="text-white font-bold mt-2">
        <a
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mt-4"
          href="/"
        >
          Go back
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;
