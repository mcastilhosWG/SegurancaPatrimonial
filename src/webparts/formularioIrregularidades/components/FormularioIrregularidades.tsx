/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import "@pnp/sp/items/get-all";
import { IFormularioIrregularidadesProps } from "./IFormularioIrregularidadesProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { IRegistroListaIrregularidades } from "../../../interfaces";
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from "@ant-design/icons";



function Irregularidades(props: IFormularioIrregularidadesProps): React.ReactElement {

  const { Option } = Select;
  const [form] = Form.useForm();
  const _sp: SPFI = getSP(props.context);

  const [irregularidades, setIrregularidades] = React.useState([{ key: 0 }]);
  const newKey = irregularidades.length;
  const addIrregularidade = () => {
    setIrregularidades([...irregularidades, { key: newKey }]);
  };

  const removeIrregularidade = (key: any) => {
    const updatedIrregularidades = irregularidades.filter((item: { key: any; }) => item.key !== key);
    setIrregularidades(updatedIrregularidades);
  };

  //Função que envia o formulario para a lista do SharePoint
  const enviaForm = async (values: any) => {
    // console.log("values: ", values);

    try {
      for (let i = 0; i < irregularidades.length; i++) {
        const item: IRegistroListaIrregularidades = {
          Title: values.nomeVigilante,
          Data: values.dataOcorrencia.format('DD/MM/YYYY'),
          Hora: values.horaOcorrencia.format('HH:mm'),
          Irregularidade: values[`irregularidade${i + 1}`],
          Quantidade: values[`quantidades${i + 1}`],
          Ramal: values[`ramal${i + 1}`],
          Observacoes: values[`observacoes${i + 1}`],
          Predio: values.numPredio
        }

        // Adiciona o item à lista
        const retorno = await _sp.web.lists.getByTitle('Irregularidades').items.add(item);

        console.log(`Item adicionado com sucesso. ID do item: ${retorno.data.Id}`);
      
      }
    
    } catch (error) {
      alert('Prezado, ocorreu um erro inesperado em registrar seus dados. Por gentileza, tente novamente...');
      
    }
    window.location.reload()
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={enviaForm}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Data"
              name="dataOcorrencia"
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: "Por favor, insira a data!" }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="horaOcorrencia"
              label="Hora"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              rules={[{ required: true, message: "Por favor, insira a hora!" }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nome do Vigilante"
              name="nomeVigilante"
              rules={[{ required: true, message: "Por favor, insira o nome do vigilante!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nº do Prédio"
              name="numPredio"
              rules={[{ required: true, message: "Por favor, insira o número do prédio!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {irregularidades.map((irregularidade, index) => (
          <div key={irregularidade.key}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={`${index + 1}º Irregularidade`}
                  name={`irregularidade${index + 1}`}
                  rules={[{ required: true, message: "Por favor, selecione a irregularidade!" }]}
                >
                  <Select>
                    {/* Opções para a lista suspensa de irregularidades */}
                    <Option value="Luz Acessa">Luz Acessa</Option>
                    <Option value="Ar condicionado">Ar condicionado</Option>
                    <Option value="Portas Abertas">Portas Abertas</Option>
                    <Option value="Vazamento de Ar Comprimido">Vazamento de Ar Comprimido</Option>
                    <Option value="Vazamento de Água">Vazamento de Água</Option>
                    <Option value="Janelas Abertas">Janelas Abertas</Option>
                    <Option value="Ventiladores Ligados">Ventiladores Ligados</Option>
                    <Option value="Princípio de Incêndio">Pricípio de Incêndio</Option>
                    <Option value="Maquinas Ligadas">Maquinas Ligadas</Option>
                    <Option value="Água Transbordando">Água Transbordando</Option>
                    <Option value="Falta de Energia">Falta de Energia</Option>
                    <Option value="Vazamento Quimico">Vazamento Quimico</Option>
                    <Option value="Disparo de Alarmes">Disparo de Alarmes</Option>
                    <Option value="Ferramentas Expostas">Ferramentas Expostas</Option>
                    <Option value="Outros">Outros</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Quantidades"
                  name={`quantidades${index + 1}`}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira a quantidade!",
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: "Por favor, insira apenas números.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Ramal"
                  name={`ramal${index + 1}`}
                  rules={[{ required: true, message: "Por favor, insira o ramal!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Observações"
              name={`observacoes${index + 1}`}
              rules={[{ required: false }]}
            >
              <Input.TextArea />
            </Form.Item>
            {index > 0 && (
              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => removeIrregularidade(irregularidade.key)} rev={undefined} />
            )}
          </div>
        ))}
        <Row >
          <Col span={16}>
            <Button type="dashed" onClick={addIrregularidade} icon={<PlusOutlined rev={undefined} />}>
              Adicionar Irregularidade
            </Button>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button htmlType="submit" type="primary" icon={<SaveOutlined rev={undefined} />}>
                Registrar Irregularidades
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Irregularidades;