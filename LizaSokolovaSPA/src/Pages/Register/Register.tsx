import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button, Checkbox, Label } from "flowbite-react";
import { RegisterSchema } from "../../Validations/RegisterSchema";

const Register = () => {
    const initalData = {
        name: {
            first: "",
            middle: "",
            last: "",
        },
        phone: "",
        email: "",
        password: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
        isBusiness: false,
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: initalData,
        mode: "onChange",
        resolver: joiResolver(RegisterSchema),
    });

    const onSubmit = async (form: any) => {
        console.log("Form submitted:", form);

        try {
            const response = await fetch("https://your-api-endpoint.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();
            console.log("Server response:", result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-600">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-2/5 gap-4 p-4 m-auto mt-20 bg-gray-100 rounded-lg shadow-lg dark:bg-gray-500"
            >
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Register</h1>
                <FloatingLabel
                    type="text"
                    label="First  Name *"
                    variant="standard"
                    {...register("name.first")}
                    color={errors.name?.first ? "error" : "success"}
                />
                <span className="text-sm text-red-500">
                    {errors.name?.first?.message}
                </span>

                <FloatingLabel
                    type="text"
                    label="Middle Name"
                    variant="standard"
                    {...register("name.middle")}
                    color={errors.name?.middle ? "error" : "success"}
                />
                <span className="text-sm text-red-500">
                    {errors.name?.middle?.message}
                </span>

                <FloatingLabel
                    type="text"
                    label="Last Name *"
                    variant="standard"
                    {...register("name.last")}
                    color={errors.name?.last ? "error" : "success"}
                />
                <span className="text-sm text-red-500">
                    {errors.name?.last?.message}
                </span>

                <FloatingLabel
                    type="email"
                    label="Email *"
                    variant="outlined"
                    {...register("email")}
                    color={errors.email ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.email?.message}</span>

                <FloatingLabel
                    type="text"
                    label="Phone *"
                    variant="standard"
                    {...register("phone")}
                    color={errors.phone ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.phone?.message}</span>

                <FloatingLabel
                    type="text"
                    label="Country *"
                    variant="standard"
                    {...register("address.country")}
                    color={errors.address?.country ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.address?.country?.message}</span>


                <FloatingLabel
                    type="text"
                    label="City *"
                    variant="standard"
                    {...register("address.city")}
                    color={errors.address?.city ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.address?.city?.message}</span>


                <FloatingLabel
                    type="text"
                    label="Street *"
                    variant="standard"
                    {...register("address.street")}
                    color={errors.address?.street ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.address?.street?.message}</span>


                <FloatingLabel
                    type="number"
                    label="House Number *"
                    variant="standard"
                    {...register("address.houseNumber")}
                    color={errors.address?.houseNumber ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>


                <Label htmlFor="isBusiness">Is Bussines</Label>
                <Checkbox {...register("isBusiness")} />

                <FloatingLabel
                    type="password"
                    label="Password *"
                    variant="outlined"
                    {...register("password")}
                    color={errors.password ? "error" : "success"}
                />
                <span className="text-sm text-red-500">{errors.password?.message}</span>

                <Button type="submit" disabled={!isValid}>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Register;
