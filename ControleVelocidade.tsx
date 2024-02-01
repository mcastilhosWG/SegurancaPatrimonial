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
import { IControleVelocidadeProps } from "./IControleVelocidadeProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { IRegistroListaVelocidade } from "../../../interfaces";
import { SaveOutlined } from "@ant-design/icons";



function ControleVelocidade(props: IControleVelocidadeProps): React.ReactElement {

  const { Option } = Select;
  const [form] = Form.useForm();
  const _sp: SPFI = getSP(props.context);



  //Função que envia o formulario para a lista do SharePoint
  const enviaForm = async (values: any) => {
    // console.log("values: ", values);

    try {
      const item: IRegistroListaVelocidade = {
        Title: values.nomeColaborador,
        Vigilante: values.vigilante,
        CadastroCpf: values.cadastroCpf,
        TelefoneRamal: values.telefoneRamal,
        EmpresaCondutor: values.empresaCondutor,
        LocalAbordagem: values.localAbordagem,
        Veiculo: values.veiculo,
        Cor: values.cor,
        Placa: values.placa,
        Data: values.data.format("DD/MM/YYYY"),
        Hora: values.hora.format("HH:mm"),
        Km: values.velocidadeRegistrada,
        Observacoes: values.observacoes,
      }
      console.log(item)
      // Adiciona o item à lista
      const retorno = await _sp.web.lists.getByTitle('ControleVelocidade').items.add(item);

      console.log(`Item adicionado com sucesso. ID do item: ${retorno.data.Id}`);


    } catch (error) {
      alert('Prezado, ocorreu um erro inesperado em registrar seus dados. Por gentileza, tente novamente...');

    }
    window.location.reload()
  }

  return (
    <>
      <Form form={form} layout="vertical" onFinish={enviaForm}>
        <Form.Item
          label="Nome do Vigilante"
          name="vigilante"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={24}>
            <h2>Dados Pessoais</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nome do Colaborador"
              name="nomeColaborador"
              rules={[{ required: true, message: "Por favor, insira o nome do colaborador!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cadastro/Cpf"
              name="cadastroCpf"
              rules={[{ required: true, message: "Por favor, insira o cadastro/Cpf!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Telefone/Ramal"
              name="telefoneRamal"
              rules={[{ required: true, message: "Por favor, insira o telefone/Ramal!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Empresa do Condutor"
              name="empresaCondutor"
              rules={[{ required: true, message: "Por favor, insira a empresa do condutor!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Local da Abordagem"
              name="localAbordagem"
              rules={[{ required: true, message: "Por favor, insira o local da abordagem!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <h2>Ocorrência</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Veículo"
              name="veiculo"
              rules={[{ required: true, message: "Por favor, insira o veículo!" }]}
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
        <Row gutter={24}>
          <Col span={6}>
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
          <Col span={6}>
            <Form.Item
              label="Velocidade Registrada"
              name="velocidadeRegistrada"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a velocidade registrada!",
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
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <h2>Observação</h2>
          </Col>
        </Row>
        <Form.Item
          label="Observações"
          name={`observacoes`}
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>


        <Form.Item>
          <Button htmlType="submit" type="primary" icon={<SaveOutlined rev={undefined} />} block>
            Registrar Irregularidade
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}

export default ControleVelocidade;