import React from "react";

class DevisPrint extends React.Component {
    render() {
        const { ref, devi } = this.props;
        return (
            <div ref={ref}>
                <div>DevisPrint</div>
                <h1>{devi.id}</h1>
            </div>
        );
    }
}

export default DevisPrint;
