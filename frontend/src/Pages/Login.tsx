import { useState } from "react";
import { pokemonApi } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldError, setFieldError] = useState<any>({});
  //const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const navigate = useNavigate();


  function onLogin(){
    if(!validateFields()) return;

    const data: Record<string, string> = {
      email,
      password
    }

    pokemonApi.post("auth/login", data).then((response: any) => {
      const tokenJwt: string = response.data.accessToken;
      const userExternalId: string = response.data.userExternalId;

      localStorage.setItem("token", tokenJwt);
      localStorage.setItem("userExternalId", userExternalId);

      navigate("/home");
    }).catch((error: any) => {
      if(error.response.status === 404) setApiError(error.response.data.message);

      if(error.response.status === 401) setApiError(error.response.data.message);
    });
  }

  function validateFields(){
    let newErrors: any = {};

    if(!email || email === ""){
      newErrors.email = "Email é obrigatório";
    } else if (!email.includes("@")) {
      newErrors.email = "Email inválido";
    }

    if (!password || password === "") {
      newErrors.password = "Senha é obrigatória";
    }

    setFieldError(newErrors);

    return Object.keys(newErrors).length === 0;
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

              {apiError && <span className="pixel-font text-xs text-[#ff0808] text-center block mb-2">{apiError}</span>}

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-[#9bbc0f] pixel-font">{isLogin ? "USUÁRIO" : "CRIAR USUÁRIO"}</label>
                  <input className="w-full bg-[#306230] text-[#9bbc0f] p-2 border-2 border-[#0f380f] rounded-lg pixel-font" 
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderColor: fieldError.email && "#ff0808"
                  }}
                  />
                  {fieldError.email && <span className="pixel-font text-xs text-[#ff0808]">{fieldError.email}</span>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-[#9bbc0f] pixel-font">SENHA</label>
                  <input className="w-full bg-[#306230] text-[#9bbc0f] p-2 border-2 border-[#0f380f] rounded-lg pixel-font" 
                  placeholder="senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  {fieldError.password && <span className="pixel-font text-xs text-[#ff0808]">{fieldError.password}</span>}
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
