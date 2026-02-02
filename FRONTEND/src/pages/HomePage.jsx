import UrlForm from '../components/UrlForm'
const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-full sm:max-w-md md:max-w-2xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-4 sm:p-6">
        <h1 className="text-lg sm:text-xl font-semibold mb-3 text-white">
          URL Shortener
        </h1>
        <UrlForm />
      </div>
    </div>
  );
};


export default HomePage