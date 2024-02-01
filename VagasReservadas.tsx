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
import { IVagasReservadasProps } from "./IVagasReservadasProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { IRegistroListaVagas } from "../../../interfaces";
import { SaveOutlined } from "@ant-design/icons";



function VagasReservadas(props: IVagasReservadasProps): React.ReactElement {

  const { Option } = Select;
  const [form] = Form.useForm();
  const _sp: SPFI = getSP(props.context);



  //Função que envia o formulario para a lista do SharePoint
  const enviaForm = async (values: any) => {
    // console.log("values: ", values);

    try {
      const item: IRegistroListaVagas = {
        Title: values.vigilante,
        Veiculo: values.veiculo,
        Cor: values.cor,
        Placa: values.placa,
        Data: values.data.format("DD/MM/YYYY"),
        Hora: values.hora.format("HH:mm"),
        Vaga: values.vaga,
        Portaria: values.portaria
      }
      console.log(item)
      // Adiciona o item à lista
      const retorno = await _sp.web.lists.getByTitle('VagasReservadas').items.add(item);

      console.log(`Item adicionado com sucesso. ID do item: ${retorno.data.Id}`);


    } catch (error) {
      alert('Prezado, ocorreu um erro inesperado em registrar seus dados. Por gentileza, tente novamente...');

    }
    window.location.reload()
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={enviaForm}>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              label="Nome do Vigilante"
              name="vigilante"
              rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Data"
              name="data"
              rules={[{ required: true, message: "Por favor, insira a data!" }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="hora"
              label="Hora"

              rules={[{ required: true, message: "Por favor, insira a hora!" }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Modelo do Veículo"
              name="veiculo"
              rules={[{ required: true, message: "Por favor, insira o modelo do veículo!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Placa"
              name="placa"
              rules={[{ required: true, message: "Por favor, insira a placa!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              label="Vaga"
              name="vaga"
              rules={[{ required: true, message: "Por favor, selecione a vaga!" }]}
            >
              <Select>
                <Option value="Carona Solidária">Carona Solidária</Option>
                <Option value="Gestante">Gestante</Option>
                <Option value="Visitante">Visitante</Option>
                <Option value="Deficiente">Deficiente</Option>
                <Option value="Banco">Banco</Option>
                <Option value="Vaga Imaginária">Vaga Imaginária</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Cor"
              name="cor"
              rules={[{ required: true, message: "Por favor, selecione a cor!" }]}
            >
              <Select>
                <Option value="Amarelo">Amarelo</Option>
                <Option value="Azul">Azul</Option>
                <Option value="Bege">Bege</Option>
                <Option value="Bordô">Bordô</Option>
                <Option value="Branco">Branco</Option>
                <Option value="Ciano">Ciano</Option>
                <Option value="Cinza">Cinza</Option>
                <Option value="Dourado">Dourado</Option>
                <Option value="Laranja">Laranja</Option>
                <Option value="Lilás">Lilás</Option>
                <Option value="Marrom">Marrom</Option>
                <Option value="Prata">Prata</Option>
                <Option value="Preto">Preto</Option>
                <Option value="Rosa">Rosa</Option>
                <Option value="Roxo">Roxo</Option>
                <Option value="Verde">Verde</Option>
                <Option value="Vermelho">Vermelho</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Portaria"
              name="portaria"
              rules={[{ required: true, message: "Por favor, selecione a Portaria!" }]}
            >
              <Select>
                <Option value="P11">P11</Option>
                <Option value="P12">P12</Option>
                <Option value="P21">P21</Option>
                <Option value="P22">P22</Option>
                <Option value="P23">P23</Option>
                <Option value="P24">P24</Option>
                <Option value="P31">P31</Option>
                <Option value="P32">P32</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>



        <Form.Item wrapperCol={{span: 8 }}>
          <Button htmlType="submit" type="primary" icon={<SaveOutlined rev={undefined} />} block>
            Registrar Irregularidade
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}

export default VagasReservadas;