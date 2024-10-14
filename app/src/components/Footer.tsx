export function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-gray-600">
      <p className="flex justify-center items-center space-x-4">
        <span>Sounak Pradhan</span>
        <span>•</span>
        <a
          href="https://github.com/sounak98"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://github.com/sounak98/mockswap" // Replace with your actual repo URL
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Repo
        </a>
      </p>
    </footer>
  );
}
