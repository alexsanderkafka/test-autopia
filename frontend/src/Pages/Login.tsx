import { useState } from "react";

function Login() {

  const [isLogin, setIsLogin] = useState<boolean>(true);

  function onLogin(){
    //Logica de login ou criação de conta
  }

  return (
    <div className="min-h-screen bg-[#9bbc0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#8bac0f] p-8 rounded-t-3xl border-8 border-[#0f380f] shadow-[8px_8px_0px_0px_rgba(15,56,15,0.3)]">
          <div className="bg-[#9bbc0f] p-6 border-4 border-[#0f380f] rounded-lg shadow-inner">
            <div className="bg-[#0f380f] p-6 rounded">
              <h1 className="text-3xl text-[#9bbc0f] text-center mb-6 pixel-font">
                POKÉDEX
              </h1>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-[#9bbc0f] pixel-font">{isLogin ? "USUÁRIO" : "CRIAR USUÁRIO"}</label>
                  <input className="w-full bg-[#306230] text-[#9bbc0f] p-2 border-2 border-[#0f380f] rounded-lg pixel-font" 
                  placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-[#9bbc0f] pixel-font">SENHA</label>
                  <input className="w-full bg-[#306230] text-[#9bbc0f] p-2 border-2 border-[#0f380f] rounded-lg pixel-font" 
                  placeholder="senha"
                  />
                </div>
              </div>

              <button
                onClick={onLogin}
                className="my-2 w-full bg-[#306230] hover:bg-[#0f380f] transition-colors duration-300 text-[#9bbc0f] border-4 border-[#0f380f] rounded-lg py-6 pixel-font text-lg shadow-[4px_4px_0px_0px_rgba(15,56,15,0.5)]"
              >
                {isLogin ? "▶ ENTRAR" : "▶ CRIAR CONTA"}
              </button>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-[#9bbc0f] text-sm hover:text-[#8bac0f] transition-colors pixel-font"
              >
                {isLogin ? "Criar uma conta →" : "← Já tenho conta"}
              </button>

              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-[#9bbc0f]"></div>
                <div className="w-2 h-2 rounded-full bg-[#9bbc0f]"></div>
                <div className="w-2 h-2 rounded-full bg-[#9bbc0f]"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#8bac0f] p-8 rounded-b-3xl border-8 border-t-0 border-[#0f380f] shadow-[8px_8px_0px_0px_rgba(15,56,15,0.3)]">
          <div className="flex justify-center gap-8 items-center">
            <div className="relative w-24 h-24">
              <div className="absolute left-1/2 top-0 w-7 h-7 bg-[#0f380f] -translate-x-1/2"></div>
              <div className="absolute left-1/2 bottom-0 w-7 h-7 bg-[#0f380f] -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-0 w-7 h-7 bg-[#0f380f] -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-0 w-7 h-7 bg-[#0f380f] -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-7 h-7 bg-[#0f380f] -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="mt-10 flex flex-col items-center">
                <div className=" w-12 h-12 rounded-full bg-[#A6265B] border-4 border-[#0f380f]"></div>
                <p className="pixel-font mt-2 text-center">B</p>
              </div>
              <div className="flex flex-col items-center">
                <div className=" w-12 h-12 rounded-full bg-[#A6265B] border-4 border-[#0f380f]"></div>
                <p className="pixel-font mt-2 text-center">A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
