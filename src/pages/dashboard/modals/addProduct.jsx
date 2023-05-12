import { Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Product } from "..";
import supabase from "@/pages/auth/supabaseClient";
import Cookies from "js-cookie";

export default function AddProduct() {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const [formData, setFormData] = useState({
    productName: "",
    // productType: "",
    // taxType: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [productType, setProductType] = useState(null);
  const [taxType, setTaxType] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [sgst, setSgst] = useState(null);
  const [vendor, setVendor] = useState(null);

  const dataToBeSent = {
    productName: formData.productName,
    productType: productType,

    taxType: taxType,
    cgst: cgst,
    sgst: sgst,
    vendor: vendor,
  };

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    switch (name) {
      case "productType":
        setProductType(value);
        break;
      case "taxType":
        setTaxType(value);
        break;
      case "cgst":
        setCgst(value);
        break;
      case "sgst":
        setSgst(value);
        break;
      case "vendor":
        setVendor(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("product_table")
        .insert([{ email: Cookies.get("email"), product_info: dataToBeSent }]);
      console.log(Cookies.get("email"));
      console.log(data);
      console.log("chal ra hai");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          onClick={() => handleOpen("xxl")}
          variant="gradient"
          color="white"
          className="bg-white text-sm sm:text-base"
        >
          Add Product +
        </Button>
      </div>
      <Dialog open={size === "xxl"} size={size || "xxl"} handler={handleOpen}>
        <DialogHeader>Add a new product</DialogHeader>
        <DialogBody divider className=" overflow-y-scroll ">
          <form className="my-2 w-full  md:mx-10  ">
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Product Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input
                  className=""
                  size="md"
                  label="Product Name"
                  name="productName"
                  onChange={handleChange}
                />
                <Input
                  className="cursor-pointer"
                  size="md"
                  label="Upload Product Image"
                  type="file"
                  icon={<ArrowUpTrayIcon />}
                />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select
                  label="Choose Product Type"
                  className="flex-col"
                  value={productType}
                  name="productType"
                  onChange={(value) => handleSelectChange("productType", value)}
                >
                  <Option value="goods">Goods</Option>
                  <Option value="service">Service</Option>
                </Select>

                <Select
                  label="Choose Tax Type"
                  className="flex-col"
                  value={taxType}
                  name="taxType"
                  onChange={(value) => handleSelectChange("taxType", value)}
                >
                  <Option value="taxable">Taxable</Option>
                  <Option value="nonTaxable">Non-Taxable</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Tax Rates
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Select
                  value={cgst}
                  label="CGST"
                  className="flex-col"
                  name="cgst"
                  onChange={(value) => handleSelectChange("cgst", value)}
                >
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="28">28%</Option>
                </Select>
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Select
                  value={sgst}
                  label="SGST"
                  className="flex-col"
                  name="sgst"
                  onChange={(value) => handleSelectChange("sgst", value)}
                >
                  <Option defaultChecked value="5">
                    5%
                  </Option>
                  <Option value="12">12%</Option>
                  <Option value="18">18%</Option>
                  <Option value="28">28%</Option>
                </Select>
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Additional Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Dimensions (LxBxH)" />
                <Input className="" size="md" label="Manufacturer" />
                <Input className="" size="md" label="EAN" />
                <Input className="" size="md" label="MPN" />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Weight" />
                <Input className="" size="md" label="Brand" />
                <Input className="" size="md" label="ISBN" />
                <Input className="" size="md" label="UPC" />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Sales Information
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Selling Price" />
                <Input className="" size="md" label="Description" />
              </div>
              <div className=" mb-2 flex flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Cost Price" />
              </div>
            </div>
            <Typography className="mb-3 text-lg font-semibold">
              {" "}
              Inventory Details
            </Typography>
            <div className=" my-2 flex w-full flex-col justify-start gap-x-2 md:flex-row md:gap-x-4 ">
              <div className="mb-4 flex  flex-col gap-4 md:w-1/2">
                <Input className="" size="md" label="Opening Stock" />
                <Input className="" size="md" label="Reorder Point" />
              </div>
              <div className=" mb-6 flex flex-col gap-4 md:w-1/2">
                <Select
                  value={vendor}
                  label="Vendor"
                  className="flex-col"
                  onChange={(value) => handleSelectChange("vendor", value)}
                >
                  <Option value="chindiBaniya">Chindi Baniya</Option>
                  <Option value="samosaChor">Samosa Chor</Option>
                  <Option value="paniDoodhwala">Pani Doodhwala</Option>
                </Select>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
