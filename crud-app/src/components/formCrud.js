import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'

 class CrudForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        selectedRow: null,
         loading: true,
      columns: [
        { title: 'Name', field: 'firstName' },
        { title: 'Last', field: 'lastName', },
        { title: 'Email', field: 'email', type: 'string' },
        {
          title: 'Phone',
          field: 'phone',
          type: 'numeric'
        },
        { title: 'Location', field: 'location', },
        { title: 'Hobby', field: 'hobby', },
      ],
      data: []
    }
  }

   componentDidMount = () => {

    axios.get('/api/crud')
        .then(response => {

            this.setState(prevState => ({
                data: [...prevState.data, ...response.data.data],
                loading: false 
            }))

        }).catch(err => {
            console.log(err)
        })
}

 //crud User add in data base
 saveUser = (data) => {
  
  return new Promise((resolve, reject) => {

      setTimeout(() => {
          {

              axios.post('/api/crud/save',  {  data })
                  .then(response => {
                    console.log(response.data.data)
                      let newUser = response.data.data
                      this.setState({ data: [...this.state.data, newUser] }, () => resolve());

                      // this.props.history.push('/')
                  }).catch(err => {
                      console.log(err)
                      resolve()
                  })

          }
          resolve()

      }, 1000)

  })
}

 // update User
 updateUser = (newData, oldData) => {
  delete newData._id
  console.log(oldData._id)
  let data = {
      newData: newData,
      id: oldData._id
  }

  axios.put('/api/crud/update', { data })
      .then(response => {
          console.log(response.data)
      }).catch(err => {
          console.log(err)
      })

}

 // delete a user
 deleteUser = (data) => {
  let userId = data._id;
  

  axios.delete('/api/crud', { params: { userId } })
      .then(response => {
          console.log(response.data)

      }).catch(err => {
          console.log(err)
      })
}

  render() {
    return (
      
    this.state.loading ? 
    <div className="preloader-wrapper big active">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div> :
      <MaterialTable
        title="CRUD DATABASE"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          // adding user row in database
          onRowAdd: this.saveUser,

          // update data function
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                  this.updateUser(newData, oldData);
                }
                resolve()
              }, 1000)
            }),

            //delete specific user
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                  this.deleteUser(oldData)
                }
                resolve()
              }, 1000)
            }),
        }}
        onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
        options={{
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
          }),
          exportButton: true,
          actionsColumnIndex: 7,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          }     
        }}
        
       
      />
    )
  }
}

export default CrudForm