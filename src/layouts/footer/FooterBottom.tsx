export default function FooterBottom() {
  return (
    <div className="border-t border-gray-700 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

        <p>
          © {new Date().getFullYear()} LearnCluster. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <span>Facebook</span>
          <span>Github</span>
          <span>LinkedIn</span>
        </div>

      </div>

    </div>
  );
}