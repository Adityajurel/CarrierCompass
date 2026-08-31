import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <Card className="w-[400px]">
        <h1 className="mb-6 text-center text-3xl font-bold text-cyan-400">
          CareerCompass AI
        </h1>

        <Input
          label="Email"
          placeholder="Enter email"
        />

        <Button>
          Continue
        </Button>
      </Card>
    </div>
  );
}

export default Home;