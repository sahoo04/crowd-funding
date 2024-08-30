// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
    struct Campaign {
        address creator;
        string name;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        string image;
        uint256 amountCollected;
    }

    Campaign[] public campaigns;
    
    event CampaignCreated(
        address indexed creator,
        string name,
        string title,
        string description,
        uint256 target,
        uint256 deadline,
        string image
    );

    function createCampaign(
        string memory _name,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public {
        Campaign memory newCampaign = Campaign({
            creator: msg.sender,
            name: _name,
            title: _title,
            description: _description,
            target: _target,
            deadline: _deadline,
            image: _image,
            amountCollected: 0
        });

        campaigns.push(newCampaign);
        emit CampaignCreated(msg.sender, _name, _title, _description, _target, _deadline, _image);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function donateToCampaign(uint256 _index) public payable {
        Campaign storage campaign = campaigns[_index];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Donation must be greater than 0");

        campaign.amountCollected += msg.value;

        // Transfer the donated amount to the campaign creator
        payable(campaign.creator).transfer(msg.value);
    }

    function getCampaignDetails(uint256 _index) public view returns (
        address,
        string memory,
        string memory,
        string memory,
        uint256,
        uint256,
        string memory,
        uint256
    ) {
        Campaign storage campaign = campaigns[_index];
        return (
            campaign.creator,
            campaign.name,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.image,
            campaign.amountCollected
        );
    }
}
