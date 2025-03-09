import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-[url('/bg.png')] bg-cover bg-center min-h-svh flex-col justify-center px-6 py-12 lg:px-8">
  

  <div className="sm:mx-auto sm:w-full bg-white/70 sm:max-w-sm border border-black rounded-md overflow-hidden">


    <div className="bg-black p-3 py-5 flex gap-2 text-white justify-between items-center">
   <div className="flex gap-2">
   <div>
    <Image className="h-[50px] w-auto" src="/logo.png" width={300} height={300} alt="Your Company" />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-sm">
      école
      </span>
      <span className="font-bold">
        RONSARD
      </span>
    
    </div>
   </div>

   <h2 className="font-bold tracking-tight text-gray-100">Sign in</h2>

    
    
  </div>

  

    <form className="space-y-6 mt-6 p-4" action="#" method="POST">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border" placeholder="Enter your email address" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border" placeholder="Enter your password" />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <div className="flex items-center justify-center gap-2 my-5 text-sm">
      <span className="text-indigo-600">
        Log in as:
      </span>
      <select className="border rounded-md p-2">
        <option>
          Admin
        </option>

        <option>
          Teacher
        </option>
      </select>
    </div>
  </div>
</div>
  );
}
