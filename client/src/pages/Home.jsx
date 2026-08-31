
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Card from "../components/common/Card";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">
      <Card className="w-full max-w-md">

        <h1 className="mb-3 text-center text-3xl font-bold text-cyan-400">
          CareerCompass AI
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Welcome! Choose an option to continue.
        </p>

        <div className="space-y-4">

          <Button
            type="button"
            onClick={() => navigate("/login")}
          >
            Existing User
          </Button>

          <Button
            type="button"
            onClick={() => navigate("/register")}
          >
            New User
          </Button>

        </div>

      </Card>
    </div>
  );
}

export default Home;

