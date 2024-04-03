<<<<<<< .mine
package com.uol.finalproject.edulearn.apimodel.request;


import com.uol.finalproject.edulearn.entities.enums.ProgrammingLanguage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeUserResponse {

    private long challengeId;

    private ProgrammingLanguage language;

    private Map<Long, List<Long>> userResponse = new HashMap<>();

    private Map<Long, String> algorithmResponse = new HashMap<>();
}
=======
package com.uol.finalproject.edulearn.apimodel.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeUserResponse {

    private long challengeId;

    private Map<Long, List<Long>> userResponse = new HashMap<>();
}
>>>>>>> .r7
