import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
export const meta = () => {
  return [
    { title: "Skillens - Login" },
    { name: "description", content: "Login to your accounts" },
  ];
};

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next || "/");
    }
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="gradient-border shadow-lg shadow-[0_10px_40px_rgba(0,0,0,0.4)] w-full max-w-md">
        <section className="flex flex-col gap-8 bg-[var(--color-surface)] rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-gradient">Welcome!</h1>
            <h3>Log in to contiue your job journey!</h3>
          </div>

          <div>
            {isLoading ? (
              <button className="w-full auth-button animate-pulse">
                <p>Logging you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="auth-button"
                    onClick={() => auth.signOut()}
                  >
                    <p>Log out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={() => auth.signIn()}>
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
