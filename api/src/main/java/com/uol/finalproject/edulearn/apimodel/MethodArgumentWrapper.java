package com.uol.finalproject.edulearn.apimodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class MethodArgumentWrapper {

    private List<MethodArgument> arguments;
}
