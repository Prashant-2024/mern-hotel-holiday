import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

// Define the type of the form data
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  // register is a function from react-hook-form that will register the input fields
  // watch is a function from react-hook-form that lets get value of different input fields
  // handleSubmit is a function from react-hook-form that will handle the form submission
  // formState:{erros} is a function from react-hook-form that will handle the form errors
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // useMutation is a function from react-query that will handle the changes in (POST request) 
  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("User registered successfully");
    },
    // we defind error as type Error in api-client.ts
    onError: (error:Error) => {
      console.log(error.message);
    }
  });

  const onSubmit = handleSubmit((data) => {
    // mutation.mutate will send the data to the server
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        {/* flex-1 will take space available to it, since applied on both they will take 50-50 space */}
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {/* if there is any error in firstName, it will be displayed in span tag */}
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            // validate function will allow us to write custom validation
            validate: (value) => {
              if (!value) {
                return "This field is required";
                // watch will watch the value of the password field and compare it with the value of confirmPassword field
              } else if (watch("password") !== value) {
                return "Your Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          type="submit"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
