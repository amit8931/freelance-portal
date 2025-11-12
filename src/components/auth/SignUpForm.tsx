import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeIcon, EyeCloseIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

// API stubs with TypeScript types
async function checkEmailExists(email: string): Promise<boolean> {
  // Call backend API here
  return false;
}
async function suggestUsernames(name: string): Promise<string[]> {
  return [`${name}`, `${name}_dev`, `${name}01`];
}
async function checkUsernameUnique(username: string): Promise<boolean> {
  return true;
}
async function submitSignUp(formData: {
  fname: string;
  lname: string;
  email: string;
  password: string;
  username: string;
  accountType: string;
  ageConfirmed: boolean;
}): Promise<{ success: boolean }> {
  return { success: true };
}

export default function SignUpForm() {
  // Form state
  const [step, setStep] = useState<number>(1);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  // Username step
  const [suggested, setSuggested] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [checkingUsername, setCheckingUsername] = useState<boolean>(false);

  // Account type & age
  const [accountType, setAccountType] = useState<string>("");
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(false);

  // Submission
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  // Step 1: Basic Info + Email check
  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    if (!fname || !lname || !email || !password) {
      setEmailError("All fields are required.");
      return;
    }
    if (!isChecked) {
      setEmailError("You must agree to Terms & Policies.");
      return;
    }
    const exists = await checkEmailExists(email);
    if (exists) {
      setEmailError("Email already exists. Please sign in or use another.");
      return;
    }
    const suggestions = await suggestUsernames(fname.toLowerCase() + lname.toLowerCase());
    setSuggested(suggestions);
    setStep(2);
  };

  // Step 2: Username select with unique check
  const handleUsernameSelect = async (u: string) => {
    setUsername(u);
    setUsernameError("");
    setCheckingUsername(true);
    const unique = await checkUsernameUnique(u);
    setCheckingUsername(false);
    if (!unique) {
      setUsernameError("Username is already taken. Try another.");
    }
  };
  const handleUsernameNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setUsernameError("Please select or enter a username.");
      return;
    }
    setStep(3);
  };

  // Step 3: Account type & age
  const handleAccountNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accountType) {
      setSubmitError("Please choose an account type.");
      return;
    }
    if (!ageConfirmed) {
      setSubmitError("You must confirm your age.");
      return;
    }
    setStep(4);
  };

  // Step 4: Submit & Verification
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const result = await submitSignUp({
      fname,
      lname,
      email,
      password,
      username,
      accountType,
      ageConfirmed,
    });
    setSubmitting(false);
    if (result.success) {
      setVerificationSent(true);
    } else {
      setSubmitError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Follow steps to create your account
          </p>
        </div>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label>First Name<span className="text-error-500">*</span></Label>
                <Input type="text" value={fname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFname(e.target.value)} placeholder="Enter your first name" />
              </div>
              <div>
                <Label>Last Name<span className="text-error-500">*</span></Label>
                <Input type="text" value={lname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLname(e.target.value)} placeholder="Enter your last name" />
              </div>
            </div>
            <div>
              <Label>Email<span className="text-error-500">*</span></Label>
              <Input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" />
            </div>
            <div>
              <Label>Password<span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon className="fill-gray-500 size-5" /> : <EyeCloseIcon className="fill-gray-500 size-5" />}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} className="w-5 h-5" />
              <p className="text-gray-500 dark:text-gray-400">
                Agree to <span className="text-gray-800 font-semibold dark:text-white/90">Terms & Policies</span>
              </p>
            </div>
            {emailError && <p className="text-error-500">{emailError}</p>}
            <button className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">Next</button>
          </form>
        )}
        {/* Step 2: Username Select */}
        {step === 2 && (
          <form onSubmit={handleUsernameNext} className="space-y-5">
            <Label>Select a username</Label>
            <div className="flex gap-2 mb-2">
              {suggested.map(u => (
                <button
                  key={u}
                  type="button"
                  className={`px-4 py-2 rounded-lg ${username === u ? "bg-brand-500 text-white" : "bg-gray-100"}`}
                  onClick={() => handleUsernameSelect(u)}
                  disabled={checkingUsername}
                >
                  {u}
                </button>
              ))}
            </div>
            <Input
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Or create your own"
            />
            {usernameError && <p className="text-error-500">{usernameError}</p>}
            <button className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">Next</button>
          </form>
        )}
        {/* Step 3: Account Type & Age */}
        {step === 3 && (
          <form onSubmit={handleAccountNext} className="space-y-5">
            <Label>Account Type</Label>
            <div className="flex gap-4">
              <label>
                <input type="radio" value="freelancer" checked={accountType === "freelancer"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountType(e.target.value)} />
                <span className="ml-1">I want to Earn Money</span>
              </label>
              <label>
                <input type="radio" value="client" checked={accountType === "client"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountType(e.target.value)} />
                <span className="ml-1">I want to Hire</span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={ageConfirmed} onChange={setAgeConfirmed} />
              <span>I confirm I am at least 16 years old</span>
            </div>
            {submitError && <p className="text-error-500">{submitError}</p>}
            <button className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">Sign Up</button>
          </form>
        )}
        {/* Step 4: Verification */}
        {step === 4 && (
          <form onSubmit={handleSignUp} className="space-y-5">
            <p className="font-semibold">Almost Done! Click Sign Up to create your account.</p>
            {submitError && <p className="text-error-500">{submitError}</p>}
            <button className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600" disabled={submitting}>Sign Up</button>
          </form>
        )}
        {/* Verification Sent Message */}
        {verificationSent && (
          <div className="py-8">
            <h2 className="text-brand-500 font-semibold mb-2">Verification Email Sent!</h2>
            <p>Check your inbox and follow the link to activate your account.</p>
            <Link to="/signin" className="mt-4 inline-block text-brand-500 hover:text-brand-600">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
