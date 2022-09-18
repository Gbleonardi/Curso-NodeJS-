// Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// Modulos internos(Core modules)
const fs = require('fs')
const { connect } = require('http2')


// Função listar opções
operation()

function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que voce deseja fazer ?',
                choices: [
                    'Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Trasnferir',
                    'Sair',
                ],
            },
        ])
        .then((answer) => {
            const action = answer['action']

            if (action === 'Criar Conta') {
                createAccount()
            } else if (action === 'Depositar') {
                deposit()
            } else if (action === 'Consultar Saldo') {
                getAccountabalance()
            } else if (action === 'Sacar') {
                withdraw()
            } else if (action == 'Trasnferir') {
                Transfer()
            } else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
            }
        })
        .catch((err) => console.log(err))
}

// Função criar conta
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para a sua conta:'
            },

        ])
        .then((answer) => {
            const accountName = answer['accountName']

            console.info(accountName)

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta já exite, escolha outro nome!'),
                )
                buildAccount()
                return
            }

            fs.writeFileSync(`accounts/${accountName}.json`,
                '{"balance": 0}',
                function (err) {
                    console.log(err)
                },
            )

            console.log(chalk.green('Parabéns, a sua conta foi criada!'))
            operation()
        })
        .catch((err) => console.log(err))
}

// Adicionar valor a conta do usuario
function deposit() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta ?',
            },
        ])
        .then((answer) => {
            const accountName = answer['accountName']

            // Verificar se a conta exite
            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto voce deseja depositar',
                    },
                ]).then((answer) => {
                    const amount = answer['amount']

                    // add an amount 

                    addAmount(accountName, amount)
                    operation()

                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }

    return true
}


function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black)('Ocorreu um erro, tente novamente mais tarde!')
        return deposit()
    }


    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData)),
        function (err) {
            consol.log(err)
        }

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))

}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJSON)
}

// Mostrar balanço da conta
function getAccountabalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accountName = answer["accountName"]

        // verify if account exists
        if (!checkAccount(accountName)) {
            return getAccountabalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Oĺa o saldo da sua conta é de R$${accountData.balance}`,
        )
        )
        operation()

    })
        .catch(err => console.log(err))
}

// // Função Transferir
function Transfer() {


    // Verificar conta
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return Trasnfer()
        }

        // Trasnferir
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto voce deseja trasnferir'
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
        })

            .catch(err => console.log(err))
    })

}


// Sacar o valor da conta
function withdraw() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {

        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withdraw()
        }

        // Sacar
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto voce deseja sacar'
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)

        })
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err))

}


function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
        )
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Saldo insuficiente para saque! '))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`),
    )
    operation()
}