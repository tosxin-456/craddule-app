import React from 'react';

const Header = () => {
    return(
        
    <div className="">
    <nav className="navbar navbar-expand-lg navbar-light menuC topN">
            <div className="container">
                <div className='row'>
                    <div className='col-md-3'>
                      
                        <a className="navbar-brand" href="#"><span class="gold-circle" ></span><span>Craddule</span></a>

                        </div>
                    </div>

                    <div className='col-md-9'>
                        <div className="collapse navbar-collapse menuC" id="navbarNav">
                            <ul className="navbar-nav">
                                
                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Team Management </a>
                                </li>

                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Profile</a>
                                </li>

                                <li className="nav-item menuCa">
                                    <a className="nav-link" href="#">Settings</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>       
                
            </div>
    </nav>

</div>
    )
}

export default Header