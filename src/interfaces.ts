export interface IRegistroListaIrregularidades{
    Title: string;
    Data: String;
    Hora: string;
    Predio: string;
    Irregularidade: string;
    Quantidade: string;
    Ramal: string;
    Observacoes: string;
}

export interface IRegistroListaVelocidade{
    Title: string;
    Vigilante: string;
    CadastroCpf: string;
    TelefoneRamal: string;
    EmpresaCondutor: string;
    LocalAbordagem: string;
    Veiculo: string;
    Cor: string;
    Placa: string;
    Data: string;
    Hora: string;
    Km: string;
    Observacoes: string;
}


export interface IRegistroListaVagas{
    Data: string;
    Hora: string;
    Title: string; //nome do vigilante
    Placa: string;
    Veiculo: string;
    Cor: string;
    Vaga: string;
    Portaria: string;
}