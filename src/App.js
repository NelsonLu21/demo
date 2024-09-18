import logo from "./logo.svg";
import Searchbar from "./components/Searchbar";
import "./App.css";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Tree,
  TreeSelect,
  Upload,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function App() {
  return (
    <div>
      <h1 id="header">SDHS Animal Intake Form</h1>
      <div id="form">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ alignItems: "center" }}
        >
          <Form.Item label="Status">
            <Radio.Group>
              <Radio value="seize"> EB/Seize </Radio>
              <Radio value="offspring"> Offspring </Radio>
              <Radio value="os"> OS </Radio>
              <Radio value="Repitle"> Stray </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Group">
            <Radio.Group>
              <Radio value="seize"> Canine </Radio>
              <Radio value="offspring"> Feline </Radio>
              <Radio value="os"> Other </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Type">
            <Input />
          </Form.Item>
          <Form.Item label="Animal Name">
            <Input />
          </Form.Item>
          <Form.Item label="Animal ID">
            <Input />
          </Form.Item>
          <Form.Item label="Shelter Tag">
            <Input />
          </Form.Item>
          <Form.Item label="SDHS Tag">
            <Input />
          </Form.Item>
          <Form.Item label="Incoming Region">
            <Select>
              <Select.Option value="elcajon">El Cajon Campus</Select.Option>
              <Select.Option value="sd5480">
                San Diego Campus 5480
              </Select.Option>
              <Select.Option value="sd5495">
                San Diego Campus 5495
              </Select.Option>
              <Select.Option value="sd5500">
                San Diego Campus 5500
              </Select.Option>
              <Select.Option value="sd5525">
                San Diego Campus 5525
              </Select.Option>
              <Select.Option value="os-cats">
                Oceanside Campus - Cats
              </Select.Option>
              <Select.Option value="os-dogs">
                Oceanside Campus - Dogs
              </Select.Option>
              <Select.Option value="nursery">Nursery - San Diego</Select.Option>
              <Select.Option value="escondido">Escondido</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Eval Category">
            <Select>
              <Select.Option value="healthy">Healthy</Select.Option>
              <Select.Option value="treatable-manage">
                Treatable-Managable
              </Select.Option>
              <Select.Option value="treatable-rehab">
                Treatable-Rehabilitatable
              </Select.Option>
              <Select.Option value="unhealthy">
                Unhealthy-Untreatable
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Eval Conditions">
            <Input />
          </Form.Item>

          <Form.Item label="Primary Breed">
            <TreeSelect
              treeData={[
                {
                  title: "Canine",
                  value: "light",
                  children: [
                    { title: "Husky", value: "Husky" },
                    { title: "Pitbull", value: "Pitbull" },
                    { title: "Chihuahua", value: "Chihuahua" },
                  ],
                },
                {
                  title: "Feline",
                  value: "light",
                  children: [
                    { title: "Domestic Shorthair", value: "Cat 1" },
                    { title: "Domestic Longhair", value: "Cat 2" },
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Address">
            <Searchbar />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
