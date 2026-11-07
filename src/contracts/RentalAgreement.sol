
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAgreement {

    // Structure to store rental agreement details
    struct Agreement {
        uint256 id;
        string propertyReference;
        address landlord;
        address tenant;
        uint256 monthlyRent;
        uint256 securityDeposit;
        uint256 startDate;
        uint256 endDate;
        bool accepted;
        uint256 createdAt;
    }

    // Agreement counter
    uint256 public nextAgreementId = 1;

    // Mapping to store agreements
    mapping(uint256 => Agreement) private agreements;

    // Event emitted when an agreement is created
    event AgreementCreated(
        uint256 indexed id,
        address indexed landlord,
        address indexed tenant
    );

    // Event emitted when an agreement is accepted
    event AgreementAccepted(
        uint256 indexed id,
        address indexed tenant
    );

    // Create a new rental agreement
    function createAgreement(
        string memory _propertyReference,
        address _tenant,
        uint256 _monthlyRent,
        uint256 _securityDeposit,
        uint256 _startDate,
        uint256 _endDate
    ) public returns (uint256) {

        require(
            bytes(_propertyReference).length > 0,
            "Property reference required"
        );

        require(
            _tenant != address(0),
            "Invalid tenant address"
        );

        require(
            _tenant != msg.sender,
            "Tenant must differ from landlord"
        );

        require(
            _monthlyRent > 0,
            "Rent must be positive"
        );

        require(
            _startDate > block.timestamp,
            "Start date must be in future"
        );

        require(
            _endDate > _startDate,
            "Invalid rental dates"
        );

        uint256 id = nextAgreementId++;

        agreements[id] = Agreement({
            id: id,
            propertyReference: _propertyReference,
            landlord: msg.sender,
            tenant: _tenant,
            monthlyRent: _monthlyRent,
            securityDeposit: _securityDeposit,
            startDate: _startDate,
            endDate: _endDate,
            accepted: false,
            createdAt: block.timestamp
        });

        emit AgreementCreated(
            id,
            msg.sender,
            _tenant
        );

        return id;
    }

    // Allow only the designated tenant to accept
    function acceptAgreement(uint256 _id) public {

        Agreement storage a = agreements[_id];

        require(
            a.id != 0,
            "Agreement does not exist"
        );

        require(
            msg.sender == a.tenant,
            "Only tenant can accept"
        );

        require(
            !a.accepted,
            "Already accepted"
        );

        a.accepted = true;

        emit AgreementAccepted(
            _id,
            msg.sender
        );
    }

    // Retrieve rental agreement details
    function getAgreement(uint256 _id)
        public
        view
        returns (
            uint256 id,
            string memory propertyReference,
            address landlord,
            address tenant,
            uint256 monthlyRent,
            uint256 securityDeposit,
            uint256 startDate,
            uint256 endDate,
            bool accepted,
            uint256 createdAt
        )
    {
        Agreement memory a = agreements[_id];

        require(
            a.id != 0,
            "Agreement does not exist"
        );

        return (
            a.id,
            a.propertyReference,
            a.landlord,
            a.tenant,
            a.monthlyRent,
            a.securityDeposit,
            a.startDate,
            a.endDate,
            a.accepted,
            a.createdAt
        );
    }
}
