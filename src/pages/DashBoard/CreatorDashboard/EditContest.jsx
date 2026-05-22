import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const EditContest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [deadline, setDeadline] = useState(new Date());

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    // ----------------------------
    // Load existing contest data
    // ----------------------------
    useEffect(() => {
        fetch(`http://localhost:3000/contests/${id}`)
            .then(res => res.json())
            .then(data => {
                setValue("name", data.name);
                setValue("image", data.image);

                setValue("description", data.short_description);
                setValue("taskInstruction", data.task);

                setValue("price", data.price);
                setValue("prizeMoney", data.prizeMoney);
                setValue("type", data.type);

                setDeadline(new Date(data.deadline));
            });
    }, [id, setValue]);

    // ----------------------------
    // Update Contest
    // ----------------------------
    const onSubmit = async (data) => {
        setLoading(true);

        const updatedContest = {
            name: data.name,
            image: data.image,

            short_description: data.description,
            task: data.taskInstruction,

            price: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney),

            type: data.type,
            deadline: deadline,
            updatedAt: new Date(),
        };

        try {
            const res = await fetch(`http://localhost:3000/contests/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedContest),
            });

            if (!res.ok) throw new Error("Update failed");

            Swal.fire({
                title: "Updated 🎉",
                text: "Contest updated successfully",
                icon: "success",
                confirmButtonColor: "#54CF68",
            }).then(() => {
                navigate("/creator-dashboard/my-contests");
            });

        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
            });

        } finally {
            setLoading(false);
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

            <h2 className="text-3xl font-bold mb-6 text-center">
                ✏️ Edit Contest
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input
                    className="input input-bordered w-full"
                    placeholder="Contest Name"
                    {...register("name")}
                />

                <input
                    className="input input-bordered w-full"
                    placeholder="Image URL"
                    {...register("image")}
                />

                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Short Description"
                    {...register("description")}
                />

                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Task Instruction"
                    {...register("taskInstruction")}
                />

                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Price"
                    {...register("price")}
                />

                <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Prize Money"
                    {...register("prizeMoney")}
                />

                <select
                    className="select select-bordered w-full"
                    {...register("type")}
                >
                    <option value="design">Design</option>
                        <option value="article">Photogrphy</option>
                        <option value="gaming">Gaming</option>
                        <option value="marketing">Marketing</option>
                        <option value="marketing">Coding</option>
                        <option value="marketing">Writing</option>
                        <option value="marketing">Quize</option>
                </select>

                {/* Deadline */}
                <div>
                    <label className="font-semibold">Deadline</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* UPDATE BUTTON */}
                <button
                onClick={() => navigate("/creator-dashboard")}
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Updating..." : "Update Contest"}
                </button>

            </form>
        </div>
    );
};

export default EditContest;