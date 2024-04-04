import { useForm } from "react-hook-form";
import { TProduct } from "../../interfaces/TProducts";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type Props = {
  onAdd: (product: TProduct) => void;
};

const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().allow(null, ""),
});

const ProductAdd = ({ onAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: joiResolver(productSchema),
  });
  const onSubmit = (product: TProduct) => {
    onAdd(product);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Product Add</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 255,
            })}
          />
          {errors.title && (
            <div className="text-danger">{errors.title.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            {...register("price", {
              required: true,
              min: 0,
            })}
          />
          {errors.price && (
            <div className="text-danger">{errors.price.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-control"
            {...register("description")}
          />
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default ProductAdd;
