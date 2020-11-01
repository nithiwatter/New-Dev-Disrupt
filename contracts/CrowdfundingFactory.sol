pragma solidity >=0.4.21 <0.7.0;
import "./Project.sol";

contract CrowdfundingFactory {
    // List of existing projects
    Project[] private projects;

    // Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDescription,
        string projectCategory,
        uint256 deadline,
        uint256 goalAmount
    );

    /** @dev Function to start a new project.
     * @param title Title of the project to be created
     * @param description Brief description about the project
     * @param durationInDays Project deadline in days
     * @param amountToRaise Project goal in wei
     */
    function startProject(
        string calldata title,
        string calldata description,
        string calldata category,
        uint256 durationInDays,
        uint256 amountToRaise
    ) external {
        uint256 raiseUntil = now + (durationInDays * 1 days);
        Project newProject = new Project(
            msg.sender,
            title,
            description,
            category,
            raiseUntil,
            amountToRaise
        );
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            title,
            description,
            category,
            raiseUntil,
            amountToRaise
        );
    }

    /** @dev Function to get all projects' contract addresses.
     * @return A list of all projects' contract addreses
     */
    function returnAllProjects() external view returns (Project[] memory) {
        return projects;
    }
}
