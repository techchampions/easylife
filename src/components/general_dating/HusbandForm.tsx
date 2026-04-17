import InputField from "../form/InputField";

const HusbandForm = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="">What are the things you like about your Wife</div>
        <InputField
          name="about_wife_positive"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <div className="space-y-1">
        <div className="">
          What are the things you don't like about your Wife
        </div>
        <InputField
          name="about_wife_negative"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <div className="space-y-1">
        <div className="">
          What changes and adjustments would you like your Wife to do
        </div>
        <InputField
          name="changes_to_wife"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
    </div>
  );
};

export default HusbandForm;
