import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {

    dataTable(){
        let dataJson = this.props.emotions
        return Object.keys(dataJson).map( emot => {
            return <tr>
                        <td>{emot}</td>
                        <td>{dataJson[emot]}</td>
                    </tr>
        });
    }

    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {JSON.stringify(this.props.emotions)}
          <table className="table table-bordered">
            <tbody>
            {
                this.dataTable()
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
