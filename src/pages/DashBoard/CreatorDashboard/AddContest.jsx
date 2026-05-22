import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddContest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [deadline, setDeadline] = useState(new Date());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // submit handler
    const onSubmit = async (data) => {
        const contestData = {
            name: data.name,
            image: data.image,
            short_description: data.description,
            entryFee: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney),
            task: data.taskInstruction,
            type: data.type,
            deadline: deadline,
            creator_email: user?.email,
            participants: 0,
            winnerDeclared: false,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch("http://localhost:3000/contests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contestData),
            });

            if (!res.ok) {
                throw new Error("Failed to create contest");
            }

            Swal.fire({
                title: "Contest Created 🎉",
                text: "Your contest has been added successfully",
                icon: "success",
                confirmButtonColor: "#54CF68",
            });

            reset();
            setDeadline(new Date());
            navigate("/creator-dashboard/my-contests");

        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });
        }
    };

    return (
        <div className="relative max-w-3xl mx-auto bg-base-100 p-8 rounded-2xl shadow-xl">
            <button
                onClick={() => navigate("/creator-dashboard")}
                className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-200 hover:bg-red-500 hover:text-white border-0"
            >
                ✖
            </button>

            <div className="text-center mb-6">
                <h2 className="text-4xl font-extrabold">
                    <span className="bg-linear-to-r from-[#54CF68] to-[#00827A] bg-clip-text text-transparent">
                        ➕ Add New Contest
                    </span>
                </h2>

                <p className="text-sm text-base-content/60 mt-2">
                    Create, manage and grow your contests
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <div>
                    <label>Contest Name</label>
                    <input
                        className="input input-bordered w-full"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-500">Required</p>}
                </div>

                {/* Image */}
                <div>
                    <label>Image URL</label>
                    <input
                        className="input input-bordered w-full"
                        {...register("image", { required: true })}
                    />
                </div>

                {/* Description */}
                <div>
                    <label>Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("description", { required: true })}
                    />
                </div>

                {/* Price */}
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("price", { required: true })}
                    />
                </div>

                {/* Prize Money */}
                <div>
                    <label>Prize Money</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("prizeMoney", { required: true })}
                    />
                </div>

                {/* Task Instruction */}
                <div>
                    <label>Task Instruction</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("taskInstruction", { required: true })}
                    />
                </div>

                {/* Contest Type */}
                <div>
                    <label>Contest Type</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("type", { required: true })}
                    >
                        <option value="design">Design</option>
                        <option value="article">Photogrphy</option>
                        <option value="gaming">Gaming</option>
                        <option value="marketing">Marketing</option>
                        <option value="marketing">Coding</option>
                        <option value="marketing">Writing</option>
                        <option value="marketing">Quize</option>

                    </select>
                </div>

                {/* Deadline */}
                <div>
                    <label>Deadline</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        className="input input-bordered w-full"
                        minDate={new Date()}
                    />
                </div>

                {/* Submit */}
                <button
                    className="btn btn-primary w-full">
                    Create Contest
                </button>

            </form>
        </div>
    );
};

export default AddContest;