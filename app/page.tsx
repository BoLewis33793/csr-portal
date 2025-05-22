import NavBar from '../components/navigation/navbar';

export default function Page() {
  return (
    <div className='min-h-screen min-w-screen bg-dark-400'>
      <NavBar />
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className='text-white font-bold text-[36px] text-center mb-4'>
          Welcome to AMP's Customer Service Portal!
        </h1>
      </div>
    </div>
  );
}